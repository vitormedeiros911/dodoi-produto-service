import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Produto } from '../../produto/schema/produto.schema';

@Schema({ timestamps: true, collection: 'favoritos' })
export class Favoritos {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  idCliente: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto',
    required: true,
  })
  produto: Produto;
}

export const FavoritosSchema = SchemaFactory.createForClass(Favoritos);
