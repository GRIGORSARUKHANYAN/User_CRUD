import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentCreateDto } from './dtos/commentscreate.dto';
import { CommentUpdateDto } from './dtos/commentsupdate.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  async getAll() {
    return this.commentsService.getAll();
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.commentsService.getById(id);
  }
  @Get('/post/:id')
  async getByPostId(@Param('id') postId: string) {
    return this.commentsService.getByPostId(postId);
  }
  @Post()
  async save(@Body() commentCreateDto: CommentCreateDto) {
    return this.commentsService.save(commentCreateDto);
  }

  @Put(':id')
  async updateById(
    @Body() commentUpdateDto: CommentUpdateDto,
    @Param('id') id: string,
  ) {
    return this.commentsService.updateById(id, commentUpdateDto);
  }
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.commentsService.deleteById(id);
  }
}
