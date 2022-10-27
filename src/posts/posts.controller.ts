import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostCreateDto } from './dtos/postscreate.dto';
import { PostupdateDto } from './dtos/postupdate.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll() {
    return this.postsService.getAll();
  }

  @Get('/userid/:user_id')
  async getByuserId(@Param('user_id') id: string) {
    return this.postsService.getByuserId(id);
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.postsService.getById(id);
  }

  @Post()
  async save(@Body() post: PostCreateDto) {
    return this.postsService.save(post);
  }

  @Put(':id')
  async updateById(
    @Body() postupdateDto: PostupdateDto,
    @Param('id') id: string,
  ) {
    return this.postsService.updateById(id, postupdateDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.postsService.deleteById(id);
  }
}
