import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { FiltrosFavoritosDto } from './dto/filtros-favoritos.dto';
import { FavoritosService } from './favoritos.service';
import { Favoritos } from './schema/favoritos.schema';
import { CriarFavoritoDto } from './dto/criar-favorito.dto';

const ackErrors: string[] = ['E11000'];

@Controller()
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @EventPattern('criar-favorito')
  async criarFavorito(
    @Payload() criarFavoritoDto: CriarFavoritoDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.favoritosService.criarFavoritos(criarFavoritoDto);
      await channel.ack(originalMsg);
    } catch (error) {
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError.length > 0) await channel.ack(originalMsg);
    }
  }

  @EventPattern('remover-favorito')
  async removerFavorito(
    @Payload() favoritos: Favoritos,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.favoritosService.removerFavoritos(favoritos);
      await channel.ack(originalMsg);
    } catch (error) {
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError.length > 0) await channel.ack(originalMsg);
    }
  }

  @MessagePattern('buscar-produtos-favoritos')
  async buscarProdutosFavoritos(
    @Payload() filtrosFavoritosDto: FiltrosFavoritosDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      return this.favoritosService.buscarFavoritosPorCliente(
        filtrosFavoritosDto,
      );
    } finally {
      await channel.ack(originalMsg);
    }
  }
}
