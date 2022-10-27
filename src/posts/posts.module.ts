import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Posts, PostsSchema } from 'src/schemas/posts.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
  ],
})
export class PostsModule {}
