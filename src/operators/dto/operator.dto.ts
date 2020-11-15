import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsDefined,
  Matches,
} from 'class-validator';

export class OperatorDto {
  @ApiProperty({
    description: "operator's firstname",
  })
  @IsDefined()
  @IsString()
  @MinLength(3)
  readonly name: string;

  @ApiProperty({
    description: "operator's login",
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  readonly operator: string;

  @ApiProperty({
    description: "operator's password",
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
