import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { ProdutoService } from './produto.service';
import { Produto } from './schema/produto.schema';

@Controller()
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @EventPattern('criar-produto')
  async criarProduto(@Payload() produto: Produto): Promise<void> {
    await this.produtoService.criarProduto(produto);
  }
}
