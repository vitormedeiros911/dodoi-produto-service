import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProdutoService } from './produto.service';
import { ProdutoSchema } from './schema/produto.schema';
import { ProdutoController } from './produto.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Produto', schema: ProdutoSchema }]),
  ],
  providers: [ProdutoService],
  controllers: [ProdutoController],
})
export class ProdutoModule {}
