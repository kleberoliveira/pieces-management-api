import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsDefined } from 'class-validator';

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
}
