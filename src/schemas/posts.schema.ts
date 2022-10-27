import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Users } from './users.schema';

export type PostsDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] })
  userId: Users;

  @Prop({
    type: 'string',
    required: true,
  })
  title: string;
  @Prop({
    type: 'string',
    required: true,
  })
  body: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
