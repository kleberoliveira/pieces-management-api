import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsDefined,
  Matches,
} from 'class-validator';

export class PlaceDto {
  @ApiProperty({
    description: "place's firstname",
  })
  @IsDefined()
  @IsString()
  @MinLength(3)
  readonly name: string;

  @ApiProperty({
    description: "place's login",
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  readonly place: string;

  @ApiProperty({
    description: "place's password",
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
