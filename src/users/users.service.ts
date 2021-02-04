import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private logger: Logger;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.logger = new Logger(UsersService.name, true);
  }

  async create(createUserDto: UserDto): Promise<User> {
    try {
      this.logger.debug(`create user ${createUserDto.name}`);
      const createdUser = this.userModel.create(createUserDto);
      return await createdUser;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async update(id: string, userDto: UserDto): Promise<boolean> {
    try {
      this.logger.debug(`update user ${id}`);
      const updateUser: User = userDto;
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUser,
      );
      return updatedUser !== null;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      this.logger.debug(`delete user ${id}`);
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      return deletedUser !== null;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findOneById(id: string): Promise<User> {
    this.logger.debug(`findOne user ${id}`);
    try {
      return this.userModel.findById(id).exec();
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findAll(): Promise<User[]> {
    this.logger.debug(`findAll users`);
    try {
      return this.userModel.find().exec();
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    try {
      return this.userModel.findOne({ username });
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }
}
