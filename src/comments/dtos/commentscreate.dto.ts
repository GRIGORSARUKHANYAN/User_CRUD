import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CommentCreateDto {
  @IsNotEmpty()
  @IsString()
  postId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
