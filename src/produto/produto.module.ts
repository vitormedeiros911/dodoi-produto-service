import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClientProxyModule } from '../client-proxy/client-proxy.module';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { ProdutoSchema } from './schema/produto.schema';
import { FavoritosModule } from 'src/favoritos/favoritos.module';

@Module({
  imports: [
    FavoritosModule,
    ClientProxyModule,
    MongooseModule.forFeature([{ name: 'Produto', schema: ProdutoSchema }]),
  ],
  providers: [ProdutoService],
  controllers: [ProdutoController],
})
export class ProdutoModule {}
