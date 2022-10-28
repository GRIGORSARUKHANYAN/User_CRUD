import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Albums, AlbumsDocument } from 'src/schemas/albums.schema';
import { UsersService } from 'src/users/users.service';
import { AlbumCreateDto } from './dtos/albumscreate.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Albums.name)
    private albumsModel: Model<AlbumsDocument>,
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async getAll() {
    return this.albumsModel.find();
  }

  async getByuserId(userId) {
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
    const album = await this.albumsModel.find({ userId }).exec();
    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return album;
  }

  async getById(id) {
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid album_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = await this.albumsModel.findById(id);
    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid album_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return album;
  }

  async save(album: AlbumCreateDto) {
    const user = await this.usersService.getById(album.userId);
    const albums = await this.getByuserId(album.userId);
    if (albums) {
      for (let i = 0; i < albums.length; i++) {
        if (albums[i].title == album.title) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'You already have an album with this name.',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }

    const newalbum = new this.albumsModel(album);
    newalbum.save();
    return newalbum;
  }

  async updateById(id, albumUpdateDto) {
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid album_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (albumUpdateDto.userId) {
      const validUser = await this.usersService.getById(albumUpdateDto.userId);
    }
    if (albumUpdateDto.userId) {
      const albums = await this.getByuserId(albumUpdateDto.userId);
      if (albums) {
        for (let i = 0; i < albums.length; i++) {
          if (albums[i].title == albumUpdateDto.title) {
            throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: 'You already have an album with this name.',
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      }
    }

    const albom = await this.albumsModel.findByIdAndUpdate(id, albumUpdateDto);
    if (!albom) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid albom_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.albumsModel.findById(id);
  }

  async deleteById(id) {
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid album_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = await this.albumsModel.findByIdAndRemove(id);
    if (!album) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid album_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return album;
  }
}
