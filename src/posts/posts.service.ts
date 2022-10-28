import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Posts, PostsDocument } from 'src/schemas/posts.schema';
import { UsersService } from 'src/users/users.service';
import { PostCreateDto } from './dtos/postscreate.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name)
    private postsModel: Model<PostsDocument>,
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async save(post: PostCreateDto) {
    const user = await this.usersService.getById(post.userId);
    const newpost = new this.postsModel(post);
    newpost.save();
    return newpost;
  }

  async getAll() {
    return this.postsModel.find();
  }

  async getByuserId(userId: string) {
    const valid = mongoose.Types.ObjectId.isValid(userId);
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const post = await this.postsModel.find({ userId }).exec();
    if (!post) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return post;
  }

  async getById(id) {
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
    const post = await this.postsModel.findById(id);
    if (!post) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid post_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return post;
  }

  async updateById(id, postupdateDto) {
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
    if (postupdateDto.userId) {
      const validUser = await this.usersService.getById(postupdateDto.userId);
    }
    const post = await this.postsModel.findByIdAndUpdate(id, postupdateDto);
    if (!post) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid post_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.postsModel.findById(id);
  }

  async deleteById(id) {
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
    const post = await this.postsModel.findByIdAndRemove(id);
    if (!post) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid post_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return post;
  }
}
