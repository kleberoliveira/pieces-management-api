import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateBasic({ username, password }): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const valid = user && (await password) === user.password;

    if (valid) {
      delete user.password;
      return user;
    }

    return undefined;
  }
}
