import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsDefined } from 'class-validator';

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
}
