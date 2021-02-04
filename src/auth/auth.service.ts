import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private logger: Logger;
  constructor(private usersService: UsersService) {
    this.logger = new Logger(AuthService.name, true);
  }

  async validateBasic({ username, password }): Promise<any> {
    try {
      const user = await this.usersService.findOneByUsername(username);
      const valid = user && (await password) === user.password;

      if (valid) {
        delete user.password;
        return user;
      }

      return undefined;
    } catch (error) {
      this.logger.error(error, error);
    }
  }
}
