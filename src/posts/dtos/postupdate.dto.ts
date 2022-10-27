import { IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class PostupdateDto {
  @IsOptional()
  @IsString()
  userId: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  body: string;
}
