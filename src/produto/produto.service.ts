import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Produto } from './schema/produto.schema';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel('Produto') private readonly produtoModel: Model<Produto>,
  ) {}

  async criarProduto(produto: Produto): Promise<Produto> {
    return new this.produtoModel(produto).save();
  }
}
