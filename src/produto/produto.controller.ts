import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { FiltrosProdutoDto } from './dto/filtros-produto.dto';
import { ProdutoService } from './produto.service';
import { Produto } from './schema/produto.schema';

@Controller()
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @EventPattern('criar-produto')
  async criarProduto(@Payload() produto: Produto): Promise<void> {
    await this.produtoService.criarProduto(produto);
  }

  @MessagePattern('buscar-produtos')
  async buscarProdutos(filtrosProdutoDto: FiltrosProdutoDto) {
    return this.produtoService.buscarProdutos(filtrosProdutoDto);
  }

  @MessagePattern('buscar-produto-por-id')
  async buscarProdutoPorId(id: string): Promise<Produto> {
    return this.produtoService.buscarProdutoPorId(id);
  }

  @EventPattern('atualizar-produto')
  async atualizarProduto(
    @Payload() { id, produto }: { id: string; produto: Produto },
  ): Promise<void> {
    await this.produtoService.atualizarProduto(id, produto);
  }
}
