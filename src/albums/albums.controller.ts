import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumCreateDto } from './dtos/albumscreate.dto';
import { AlbumUpdateDto } from './dtos/albumupdate.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getAll() {
    return this.albumsService.getAll();
  }

  @Get('/userid/:user_id')
  async getByuserId(@Param('user_id') id: string) {
    return this.albumsService.getByuserId(id);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.albumsService.getById(id);
  }

  @Post()
  async save(@Body() album: AlbumCreateDto) {
    return this.albumsService.save(album);
  }

  @Put(':id')
  async updateById(
    @Body() albumUpdateDto: AlbumUpdateDto,
    @Param('id') id: string,
  ) {
    return this.albumsService.updateById(id, albumUpdateDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.albumsService.deleteById(id);
  }
}
