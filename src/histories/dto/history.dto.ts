import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsDate } from 'class-validator';
import { Operator } from 'src/operators/schemas/operator.schema';
import { Place } from 'src/places/schemas/place.schema';
import { Product } from 'src/products/schemas/products.schema';

export class HistoryDto {
  @ApiProperty({
    description: "history's date",
    example: '2020-01-01',
  })
  @IsDefined()
  @IsDate()
  readonly createAt: Date;

  @ApiProperty({
    description: "history's description",
    example: 'Feito alguma coisa',
  })
  @IsDefined()
  @IsString()
  readonly history: string;

  @ApiProperty({
    description: 'Place id',
    example: '5fcd5a4f77cca71023883ca6',
  })
  @IsDefined()
  @IsString()
  readonly place: Place;

  @ApiProperty({
    description: 'Operator id',
    example: '5fcd5a4f77cca71023883ca6',
  })
  @IsDefined()
  @IsString()
  readonly operator: Operator;

  @ApiProperty({
    description: 'Product id',
    example: '5fcd5a4f77cca71023883ca6',
  })
  @IsDefined()
  @IsString()
  readonly product: Product;
}
