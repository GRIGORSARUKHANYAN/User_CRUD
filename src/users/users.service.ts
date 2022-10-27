import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../schemas/users.schema';
import mongoose, { Model } from 'mongoose';
import { UserCreateDto } from './dto/userscreat.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<UsersDocument>,
  ) {}

  async findByEmail(email: string) {
    return this.usersModel.findOne({ email }).exec();
  }

  async save(user: UserCreateDto) {
    const validator = await this.findByEmail(user.email);
    if (validator) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'There is already a registered user with this email',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newuser = new this.usersModel(user);
    newuser.save();
    return newuser;
  }
  async getById(id) {
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersModel.findById(id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async getAll() {
    return this.usersModel.find();
  }

  async updateById(id, userUpdate) {
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersModel.findByIdAndUpdate(id, userUpdate);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersModel.findById(id);
  }

  async deleteById(id) {
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersModel.findByIdAndRemove(id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user_id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
