import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    description: 'sap code',
  })
  @IsString()
  readonly sap: string;

  @ApiProperty({
    description: 'uuid code',
  })
  @IsString()
  readonly uuid: string;

  @ApiProperty({
    description: 'description',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'status',
  })
  readonly status: 'active' | 'desactive';
}
