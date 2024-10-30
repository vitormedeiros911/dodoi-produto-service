import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { FiltrosFavoritosDto } from './dto/filtros-favoritos.dto';
import { FavoritosService } from './favoritos.service';
import { Favoritos } from './schema/favoritos.schema';

@Controller()
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @EventPattern('criar-favorito')
  async criarFavorito(@Payload() favoritos: Favoritos) {
    await this.favoritosService.criarFavoritos(favoritos);
  }

  @MessagePattern('buscar-produtos-favoritos')
  async buscarProdutosFavoritos(
    @Payload() filtrosFavoritosDto: FiltrosFavoritosDto,
  ) {
    return this.favoritosService.buscarFavoritosPorCliente(filtrosFavoritosDto);
  }
}
