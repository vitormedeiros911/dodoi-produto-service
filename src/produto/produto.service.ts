import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { Produto } from './schema/produto.schema';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel('Produto') private readonly produtoModel: Model<Produto>,
  ) {}

  async criarProduto(produto: Produto): Promise<void> {
    const id = uuid();

    const novoProduto = new this.produtoModel({
      id,
      ...produto,
    });

    novoProduto.save();
  }
}
