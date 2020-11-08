import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsDefined,
  Matches,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: "user's firstname",
  })
  @IsDefined()
  @IsString()
  @MinLength(3)
  readonly name: string;

  @ApiProperty({
    description: "user's login",
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  readonly user: string;

  @ApiProperty({
    description: "user's password",
    example: '********',
  })
  @IsDefined()
  @MinLength(8)
  @IsString()
  @Matches(/(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%&*^()\-__+.])/, {
    message:
      'The password must be a combination of letters, numbers and symbols',
  })
  readonly password: string;
}
