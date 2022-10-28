import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class AlbumUpdateDto {
  @IsOptional()
  @IsString()
  userId: mongoose.Schema.Types.ObjectId;

  @IsOptional()
  @IsString()
  title: string;
}
