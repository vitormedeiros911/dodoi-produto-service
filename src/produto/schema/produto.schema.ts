import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'produtos' })
export class Produto {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  urlImagem: string;

  @Prop({ required: true })
  precoUnitario: number;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
