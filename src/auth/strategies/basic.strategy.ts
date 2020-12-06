import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { BasicStrategy as Strategy } from 'passport-http'
import { AuthService } from '../auth.service'

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
  constructor (private readonly authService: AuthService) {
    super()
  }

  validate (username: string, password: string): Promise<any> {
    return this.authService.validateBasic({ username, password })
  }
}
