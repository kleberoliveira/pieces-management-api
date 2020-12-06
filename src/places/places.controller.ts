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
import { ApiBasicAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PlaceDto } from './dto/place.dto';
import { Place } from './schemas/place.schema';
import { PlacesService } from './places.service';
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';

@ApiTags('Places')
@ApiBasicAuth()
@UseGuards(BasicAuthGuard)
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  @ApiOperation({
    summary: 'returns all places registered on the application',
    description: `
    - For control purposes only -
    This will return all registered places on the application
    `,
  })
  index(): Promise<Array<Place>> {
    return this.placesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'returns a place based on the id',
    description: `
    - For control purposes only -
    This will fetch a place based on theid id
    `,
  })
  @ApiParam({ name: 'id' })
  show(@Param() { id }: Record<string, any>): Promise<Place> {
    return this.placesService.findOneById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'creates and returns the place',
    description: `
    - For control purposes only -
    This will create the place on the platform and return the place
    `,
  })
  store(@Body() data: PlaceDto): Promise<Place> {
    return this.placesService.create(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'updates a place based on the id',
    description: `
    - For control purposes only -
    This will update the place on the platform and return the place
    `,
  })
  @ApiParam({ name: 'id' })
  update(@Param() { id }: Record<string, any>, @Body() data: PlaceDto): void {
    this.placesService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'removes a place based on the id',
    description: `
    - For control purposes only -
    This will remove the place on the platform
    `,
  })
  @ApiParam({ name: 'id' })
  destroy(@Param() { id }: Record<string, any>): void {
    this.placesService.delete(id);
  }
}
