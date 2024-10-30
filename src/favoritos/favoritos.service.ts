import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { FiltrosFavoritosDto } from './dto/filtros-favoritos.dto';
import { Favoritos } from './schema/favoritos.schema';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectModel('Favoritos') private readonly favoritosModel: Model<Favoritos>,
  ) {}

  async criarFavoritos(favoritos: Favoritos) {
    const novoFavorito = new this.favoritosModel({
      id: uuid(),
      ...favoritos,
    });

    await novoFavorito.save();
  }

  async buscarFavoritosPorCliente(filtrosFavoritosDto: FiltrosFavoritosDto) {
    const { idCliente, limit, skip } = filtrosFavoritosDto;

    const query = this.favoritosModel
      .find()
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
}
