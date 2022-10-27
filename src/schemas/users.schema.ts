import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({
    type: 'string',
    required: true,
  })
  name: string;

  @Prop({
    type: 'string',
    required: true,
  })
  username: string;

  @Prop({
    type: 'string',
    required: true,
  })
  email: string;

  @Prop({
    type: 'object',
    required: true,
  })
  address: object;

  @Prop({
    type: 'string',
    required: true,
  })
  phone: string;

  @Prop({
    type: 'string',
    required: true,
  })
  website: string;

  @Prop({
    type: 'object',
    required: true,
  })
  company: object;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
