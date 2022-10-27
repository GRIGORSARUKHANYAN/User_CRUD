import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { Comments, CommentsDocument } from 'src/schemas/comments.schema';
import { CommentCreateDto } from './dtos/commentscreate.dto';
import { CommentUpdateDto } from './dtos/commentsupdate.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private commentsModel: Model<CommentsDocument>,
    @Inject(PostsService)
    private readonly postsService: PostsService,
  ) {}

  async getAll() {
    return this.commentsModel.find();
  }

  async save(commentCreateDto: CommentCreateDto) {
    const post = await this.postsService.getById(commentCreateDto.postId);
    const newcomment = new this.commentsModel(commentCreateDto);
    newcomment.save();
    return newcomment;
  }

  async getById(id) {
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid comment_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const comment = await this.commentsModel.findById(id);
    if (!comment) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid comment_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return comment;
  }

  async getByPostId(postId: string) {
    const valid = mongoose.Types.ObjectId.isValid(postId);
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid post_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const comment = await this.commentsModel.find({ postId }).exec();
    if (!comment) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid comment_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return comment;
  }

  async updateById(id: string, commentUpdateDto: CommentUpdateDto) {
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid post_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (commentUpdateDto.postId) {
      const validpost = await this.postsService.getById(
        commentUpdateDto.postId,
      );
    }
    const comment = await this.commentsModel.findByIdAndUpdate(
      id,
      commentUpdateDto,
    );
    if (!comment) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid comment_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.commentsModel.findById(id);
  }

  async deleteById(id) {
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid comment_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const comment = await this.commentsModel.findByIdAndRemove(id);
    if (!comment) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid comment_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return comment;
  }
}
