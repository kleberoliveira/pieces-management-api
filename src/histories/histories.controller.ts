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
import { HistoryDto } from './dto/history.dto';
import { History } from './schemas/history.schema';
import { HistoriesService } from './histories.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Histories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Get()
  @ApiOperation({
    summary: 'returns all histories registered on the application',
    description: `
    - For control purposes only -
    This will return all registered histories on the application
    `,
  })
  index(): Promise<Array<History>> {
    return this.historiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'returns a history based on the id',
    description: `
    - For control purposes only -
    This will fetch a history based on theid id
    `,
  })
  @ApiParam({ name: 'id' })
  show(@Param() { id }: Record<string, any>): Promise<History> {
    return this.historiesService.findOneById(id);
  }

  @Get('product/:id')
  @ApiOperation({
    summary: 'returns a history based on the product id',
    description: `
    - For control purposes only -
    This will fetch a history based on product id
    `,
  })
  @ApiParam({ name: 'id' })
  showByProduct(@Param() { id }: Record<string, any>): Promise<Array<History>> {
    return this.historiesService.findOneByProduct(id);
  }

  @Post()
  @ApiOperation({
    summary: 'creates and returns the history',
    description: `
    - For control purposes only -
    This will create the history on the platform and return the history
    `,
  })
  store(@Body() data: HistoryDto): Promise<History> {
    return this.historiesService.create(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'updates a history based on the id',
    description: `
    - For control purposes only -
    This will update the history on the platform and return the history
    `,
  })
  @ApiParam({ name: 'id' })
  update(@Param() { id }: Record<string, any>, @Body() data: HistoryDto): void {
    this.historiesService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'removes a history based on the id',
    description: `
    - For control purposes only -
    This will remove the history on the platform
    `,
  })
  @ApiParam({ name: 'id' })
  destroy(@Param() { id }: Record<string, any>): void {
    this.historiesService.delete(id);
  }
}
