import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { ClientProxyService } from '../client-proxy/client-proxy.service';
import { FiltrosProdutoDto } from './dto/filtros-produto.dto';
import { Produto } from './schema/produto.schema';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel('Produto') private readonly produtoModel: Model<Produto>,
    private clientProxyService: ClientProxyService,
  ) {}

  private clientFarmaciaBackend =
    this.clientProxyService.getClientProxyFarmaciaServiceInstance();

  async criarProduto(produto: Produto): Promise<void> {
    const farmacia = await firstValueFrom(
      this.clientFarmaciaBackend.send(
        'buscar-farmacia-por-id',
        produto.idFarmacia,
      ),
    );

    if (!farmacia)
      throw new RpcException(new NotFoundException('Farmácia não encontrada'));

    const novoProduto = new this.produtoModel({
      id: uuid(),
      ...produto,
    });

    novoProduto.save();
  }

  async buscarProdutos(
    filtrosProdutoDto: FiltrosProdutoDto,
  ): Promise<Produto[]> {
    const { nome, limit, skip } = filtrosProdutoDto;

    const query = this.produtoModel
      .find()
      .select(['id', 'nome', 'precoUnitario', 'urlImagem']);

    if (nome) query.where('nome').regex(new RegExp(nome, 'i'));

    if (skip) query.skip(skip);

    if (limit) query.limit(limit);

    return query.exec();
  }

  async buscarProdutoPorId(id: string) {
    const produto = await this.produtoModel.findOne({ id });

    const farmacia = await firstValueFrom(
      this.clientFarmaciaBackend.send(
        'buscar-farmacia-reduzida',
        produto.idFarmacia,
      ),
    );

    return {
      ...produto.toJSON(),
      farmacia,
    };
  }

  async atualizarProduto(id: string, payloadProduto: Produto): Promise<void> {
    const produto = await this.produtoModel
      .findOne({ id })
      .select(['idFarmacia'])
      .exec();

    if (!produto)
      throw new RpcException(new NotFoundException('Produto não encontrado'));

    if (payloadProduto.idFarmacia !== produto.idFarmacia)
      throw new RpcException(
        new NotFoundException('Produto não pertence a esta farmácia'),
      );

    await this.produtoModel.updateOne({ id }, payloadProduto);
  }
}
