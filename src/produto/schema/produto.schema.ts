import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { StatusEnum } from '../../shared/interface/status.enum';
import { CategoriaEnum } from '../enum/categoria.enum';

@Schema({ timestamps: true, collection: 'produtos' })
export class Produto {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: false })
  descricao: string;

  @Prop({ required: false })
  urlImagem: string;

  @Prop({ required: true })
  precoUnitario: number;

  @Prop({ required: true })
  quantidadeDisponivel: number;

  @Prop({ required: true })
  categoria: CategoriaEnum;

  @Prop({ required: true, default: StatusEnum.ATIVO })
  status: string;

  @Prop({ required: true })
  idFarmacia: string;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
