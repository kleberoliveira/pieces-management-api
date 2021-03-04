import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponse, AuthValidate } from './auth.interface';
import { AuthUserDto } from './dto/auth-user.dto';
import { Md5 } from 'md5-typescript';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate({ username, hash }: AuthValidate): Promise<User | boolean> {
    const user: User = await this.usersService.findOneByUsername(username);
    if (!user) return false;

    const compareHash = Md5.init(`${user.password}:${user.username}`);

    const comparePassword = compareHash === hash;
    if (!comparePassword) return false;

    return user;
  }

  async login({ username, password }: AuthUserDto): Promise<AuthResponse> {
    const user: User = await this.usersService.findOneByUsername(username);
    if (!user) throw new NotFoundException();
    const comparePassword = user.password === password;
    if (!comparePassword) throw new NotFoundException();

    const hash = Md5.init(`${user.password}:${user.username}`);

    const accessToken: AuthResponse = {
      accessToken: this.jwtService.sign({
        username,
        hash,
      }),
    };

    return accessToken;
  }
}
