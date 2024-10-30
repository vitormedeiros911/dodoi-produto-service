import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FavoritosController } from './favoritos.controller';
import { FavoritosService } from './favoritos.service';
import { FavoritosSchema } from './schema/favoritos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Favoritos', schema: FavoritosSchema }]),
  ],
  providers: [FavoritosService],
  controllers: [FavoritosController],
})
export class FavoritosModule {}
