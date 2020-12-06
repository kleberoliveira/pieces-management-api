import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'
import { BasicStrategy } from './strategies/basic.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule
  ],
  providers: [
    AuthService,
    BasicStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
