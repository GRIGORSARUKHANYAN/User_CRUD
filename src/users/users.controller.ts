import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserCreateDto } from './dto/userscreat.dto';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dto/usersupdate.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async save(@Body() user: UserCreateDto) {
    return this.usersService.save(user);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Get()
  async getAll() {
    return this.usersService.getAll();
  }

  @Put(':id')
  async updateById(@Body() userUpdate: UserUpdateDto, @Param('id') id: string) {
    return this.usersService.updateById(id, userUpdate);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.usersService.deleteById(id);
  }
}
