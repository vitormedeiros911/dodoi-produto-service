import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ProdutoModule } from './produto/produto.module';
import { FavoritosModule } from './favoritos/favoritos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProdutoModule,
    FavoritosModule,
  ],
})
export class AppModule {}
