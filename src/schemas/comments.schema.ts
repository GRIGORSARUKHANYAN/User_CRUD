import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Posts } from './posts.schema';

export type CommentsDocument = Comments & Document;

@Schema()
export class Comments {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }] })
  postId: Posts;

  @Prop({
    type: 'string',
    required: true,
  })
  name: string;
  @Prop({
    type: 'string',
    required: true,
  })
  email: string;
  @Prop({
    type: 'string',
    required: true,
  })
  body: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
