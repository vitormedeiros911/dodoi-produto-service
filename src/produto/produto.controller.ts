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
  async buscarProdutoPorId(
    @Payload() { id, idCliente }: { id: string; idCliente: string },
  ): Promise<Produto> {
    return this.produtoService.buscarProdutoPorId(id, idCliente);
  }

  @MessagePattern('atualizar-produto')
  async atualizarProduto(@Payload() produto: Produto) {
    return this.produtoService.atualizarProduto(produto);
  }

  @EventPattern('deletar-produto')
  async deletarProduto(@Payload() id: string) {
    await this.produtoService.deletarProduto(id);
  }

  @EventPattern('reduzir-estoque')
  async reduzirEstoque(
    @Payload()
    { idProduto, quantidade }: { idProduto: string; quantidade: number },
  ) {
    await this.produtoService.reduzirEstoque(idProduto, quantidade);
  }

  @EventPattern('aumentar-estoque')
  async aumentarEstoque(
    @Payload()
    { idProduto, quantidade }: { idProduto: string; quantidade: number },
  ) {
    await this.produtoService.aumentarEstoque(idProduto, quantidade);
  }
}
