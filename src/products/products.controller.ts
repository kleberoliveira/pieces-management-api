import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDto } from './dto/products.dto';
import { Product } from './schemas/products.schema';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'returns all products registered on the application',
    description: `
    - For control purposes only -
    This will return all registered products on the application
    `,
  })
  index(): Promise<Array<Product>> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'returns a product based on the id',
    description: `
    - For control purposes only -
    This will fetch a product based on theid id
    `,
  })
  @ApiParam({ name: 'id' })
  show(@Param() { id }: Record<string, any>): Promise<Product> {
    return this.productsService.findOneById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'creates and returns the product',
    description: `
    - For control purposes only -
    This will create the product on the platform and return the product
    `,
  })
  store(@Body() data: ProductDto): Promise<Product> {
    return this.productsService.create(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'updates a product based on the id',
    description: `
    - For control purposes only -
    This will update the product on the platform and return the product
    `,
  })
  @ApiParam({ name: 'id' })
  update(@Param() { id }: Record<string, any>, @Body() data: ProductDto): void {
    this.productsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'removes a product based on the id',
    description: `
    - For control purposes only -
    This will remove the product on the platform
    `,
  })
  @ApiParam({ name: 'id' })
  destroy(@Param() { id }: Record<string, any>): void {
    this.productsService.delete(id);
  }
}
