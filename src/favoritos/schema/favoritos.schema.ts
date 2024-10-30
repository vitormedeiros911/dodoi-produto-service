import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'favoritos' })
export class Favoritos {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  idCliente: string;

  @Prop({ required: true })
  idProduto: string;
}

export const FavoritosSchema = SchemaFactory.createForClass(Favoritos);
