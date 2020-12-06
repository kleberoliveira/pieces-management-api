import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsDefined } from 'class-validator';

export class HistoryDto {
  @ApiProperty({
    description: "history's firstname",
  })
  @IsDefined()
  @IsString()
  @MinLength(3)
  readonly name: string;

  @ApiProperty({
    description: "history's login",
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  readonly history: string;
}
