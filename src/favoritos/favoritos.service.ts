import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { ProdutoService } from '../produto/produto.service';
import { StatusEnum } from '../shared/interface/status.enum';
import { CriarFavoritoDto } from './dto/criar-favorito.dto';
import { FiltrosFavoritosDto } from './dto/filtros-favoritos.dto';
import { Favoritos } from './schema/favoritos.schema';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectModel('Favoritos') private readonly favoritosModel: Model<Favoritos>,
    @Inject(forwardRef(() => ProdutoService))
    private produtoService: ProdutoService,
  ) {}

  async criarFavoritos(criarFavoritoDto: CriarFavoritoDto) {
    const produto = await this.produtoService.buscarProdutoReduzido(
      criarFavoritoDto.idProduto,
    );

    const novoFavorito = new this.favoritosModel({
      id: uuid(),
      idCliente: criarFavoritoDto.idCliente,
      produto,
    });

    await novoFavorito.save();
  }

  async buscarFavoritosPorCliente(filtrosFavoritosDto: FiltrosFavoritosDto) {
    const { idCliente, limit, skip } = filtrosFavoritosDto;

    const query = this.favoritosModel
      .find()
      .populate({
        path: 'produto',
        select: 'id nome urlImagem precoUnitario',
        match: { status: StatusEnum.ATIVO },
      })
      .where('idCliente')
      .equals(idCliente);

    const countQuery = this.favoritosModel
      .find(query.getFilter())
      .countDocuments();

    if (skip) query.skip(skip);

    if (limit) query.limit(limit);

    const favoritos = await query.exec();
    const total = await countQuery.exec();

    return {
      total,
      favoritos,
    };
  }

  async removerFavoritos(favoritos: Favoritos) {
    const produto = await this.produtoService.buscarProdutoReduzido(
      favoritos.produto.id,
    );

    await this.favoritosModel
      .deleteOne({
        idCliente: favoritos.idCliente,
        produto,
      })
      .exec();
  }

  async isFavorito(idProduto: string, idCliente: string): Promise<boolean> {
    const favorito = await this.favoritosModel.findOne({ idCliente }).populate({
      path: 'produto',
      match: { id: idProduto },
    });

    return Boolean(favorito && favorito.produto);
  }
}
