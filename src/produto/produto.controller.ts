import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { FiltrosProdutoDto } from './dto/filtros-produto.dto';
import { ProdutoService } from './produto.service';
import { Produto } from './schema/produto.schema';

@Controller()
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @EventPattern('criar-produto')
  async criarProduto(@Payload() produto: Produto) {
    await this.produtoService.criarProduto(produto);
  }

  @MessagePattern('buscar-produtos')
  async buscarProdutos(@Payload() filtrosProdutoDto: FiltrosProdutoDto) {
    return this.produtoService.buscarProdutos(filtrosProdutoDto);
  }

  @MessagePattern('buscar-produto-por-id')
  async buscarProdutoPorId(@Payload() id: string): Promise<Produto> {
    return this.produtoService.buscarProdutoPorId(id);
  }

  @MessagePattern('atualizar-produto')
  async atualizarProduto(@Payload() produto: Produto) {
    return this.produtoService.atualizarProduto(produto);
  }
}
