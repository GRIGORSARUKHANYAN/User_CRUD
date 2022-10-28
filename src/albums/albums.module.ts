import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Albums, AlbumsSchema } from 'src/schemas/albums.schema';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Albums.name, schema: AlbumsSchema }]),
  ],
})
export class AlbumsModule {}
