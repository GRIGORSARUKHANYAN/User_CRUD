import { IsEmail, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CommentUpdateDto {
  @IsOptional()
  @IsString()
  postId: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  body: string;
}
