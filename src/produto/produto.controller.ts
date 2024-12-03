import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { FiltrosProdutoDto } from './dto/filtros-produto.dto';
import { ProdutoService } from './produto.service';
import { Produto } from './schema/produto.schema';

const ackErrors: string[] = ['E11000'];

@Controller()
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @EventPattern('criar-produto')
  async criarProduto(@Payload() produto: Produto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.produtoService.criarProduto(produto);
      await channel.ack(originalMsg);
    } catch (error) {
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError.length > 0) await channel.ack(originalMsg);
    }
  }

  @MessagePattern('buscar-produtos')
  async buscarProdutos(
    @Payload() filtrosProdutoDto: FiltrosProdutoDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      return this.produtoService.buscarProdutos(filtrosProdutoDto);
    } finally {
      await channel.ack(originalMsg);
    }
  }

  @MessagePattern('buscar-produto-por-id')
  async buscarProdutoPorId(
    @Payload() { id, idCliente }: { id: string; idCliente: string },
    @Ctx() context: RmqContext,
  ): Promise<Produto> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      return this.produtoService.buscarProdutoPorId(id, idCliente);
    } finally {
      await channel.ack(originalMsg);
    }
  }

  @EventPattern('atualizar-produto')
  async atualizarProduto(
    @Payload() produto: Produto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.produtoService.atualizarProduto(produto);
      await channel.ack(originalMsg);
    } catch (error) {
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError.length > 0) await channel.ack(originalMsg);
    }
  }

  @EventPattern('deletar-produto')
  async deletarProduto(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.produtoService.deletarProduto(id);
      await channel.ack(originalMsg);
    } catch (error) {
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError.length > 0) await channel.ack(originalMsg);
    }
  }

  @EventPattern('reduzir-estoque')
  async reduzirEstoque(
    @Payload()
    { idProduto, quantidade }: { idProduto: string; quantidade: number },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.produtoService.reduzirEstoque(idProduto, quantidade);
      await channel.ack(originalMsg);
    } catch (error) {
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError.length > 0) await channel.ack(originalMsg);
    }
  }

  @EventPattern('aumentar-estoque')
  async aumentarEstoque(
    @Payload()
    { idProduto, quantidade }: { idProduto: string; quantidade: number },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.produtoService.aumentarEstoque(idProduto, quantidade);
      await channel.ack(originalMsg);
    } catch (error) {
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );

      if (filterAckError.length > 0) await channel.ack(originalMsg);
    }
  }
}
