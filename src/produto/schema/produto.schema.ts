import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'produtos' })
export class Produto {
  @Prop()
  id: string;

  @Prop()
  nome: string;

  @Prop()
  descricao: string;

  @Prop()
  urlImagem: string;

  @Prop()
  precoUnitario: number;
}
