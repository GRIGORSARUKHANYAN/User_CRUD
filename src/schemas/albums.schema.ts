import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Users } from './users.schema';

export type AlbumsDocument = Albums & Document;

@Schema()
export class Albums {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] })
  userId: Users;

  @Prop({
    type: 'string',
    required: true,
  })
  title: string;
}

export const AlbumsSchema = SchemaFactory.createForClass(Albums);
