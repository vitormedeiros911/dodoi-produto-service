import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProdutoModule } from '../produto/produto.module';
import { FavoritosController } from './favoritos.controller';
import { FavoritosService } from './favoritos.service';
import { FavoritosSchema } from './schema/favoritos.schema';

@Module({
  imports: [
    forwardRef(() => ProdutoModule),
    MongooseModule.forFeature([{ name: 'Favoritos', schema: FavoritosSchema }]),
  ],
  providers: [FavoritosService],
  controllers: [FavoritosController],
  exports: [FavoritosService],
})
export class FavoritosModule {}
