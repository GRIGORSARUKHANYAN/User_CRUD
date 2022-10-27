import {
  IsEmail,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsObject()
  address: object;

  @IsOptional()
  @IsPhoneNumber('AM')
  phone: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsOptional()
  @IsObject()
  company: object;
}
