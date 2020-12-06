import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: UserDto): Promise<User> {
    const createdUser = this.userModel.create(createUserDto);
    return await createdUser;
  }

  async update(id: string, userDto: UserDto): Promise<boolean> {
    const updateUser: User = userDto;
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUser);
    return updatedUser !== null;
  }

  async delete(id: string): Promise<boolean> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return deletedUser !== null;
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
