import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { FiltrosProdutoDto } from './dto/filtros-produto.dto';
import { Produto } from './schema/produto.schema';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel('Produto') private readonly produtoModel: Model<Produto>,
  ) {}

  async criarProduto(produto: Produto): Promise<void> {
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
}
