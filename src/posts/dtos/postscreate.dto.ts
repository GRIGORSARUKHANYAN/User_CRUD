import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class PostCreateDto {
  @IsNotEmpty()
  @IsString()
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
