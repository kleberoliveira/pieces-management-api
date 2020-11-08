import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/products.dto';
import { Product } from './schemas/products.schema';
import { ProductsService } from './products.service';

@ApiTags('Products')
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
    summary: 'returns a user based on the id',
    description: `
    - For control purposes only -
    This will fetch a user based on theid id
    `,
  })
  @ApiParam({ name: 'id' })
  show(@Param() { id }: Record<string, any>): Promise<Product> {
    return this.productsService.findOneById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'creates and returns the user',
    description: `
    - For control purposes only -
    This will create the user on the platform and return the user
    `,
  })
  store(@Body() data: ProductDto): Promise<Product> {
    return this.productsService.create({ data });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'updates a user based on the id',
    description: `
    - For control purposes only -
    This will update the user on the platform and return the user
    `,
  })
  @ApiParam({ name: 'id' })
  update(@Param() { id }: Record<string, any>, @Body() data: ProductDto): void {
    this.productsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'removes a user based on the id',
    description: `
    - For control purposes only -
    This will remove the user on the platform
    `,
  })
  @ApiParam({ name: 'id' })
  destroy(@Param() { id }: Record<string, any>): void {
    this.productsService.delete(id);
  }
}
