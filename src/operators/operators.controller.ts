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
import { OperatorDto } from './dto/operator.dto';
import { Operator } from './schemas/operator.schema';
import { OperatorsService } from './operators.service';

@ApiTags('Operators')
@Controller('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Get()
  @ApiOperation({
    summary: 'returns all operators registered on the application',
    description: `
    - For control purposes only -
    This will return all registered operators on the application
    `,
  })
  index(): Promise<Array<Operator>> {
    return this.operatorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'returns a operator based on the id',
    description: `
    - For control purposes only -
    This will fetch a operator based on theid id
    `,
  })
  @ApiParam({ name: 'id' })
  show(@Param() { id }: Record<string, any>): Promise<Operator> {
    return this.operatorsService.findOneById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'creates and returns the operator',
    description: `
    - For control purposes only -
    This will create the operator on the platform and return the operator
    `,
  })
  store(@Body() data: OperatorDto): Promise<Operator> {
    return this.operatorsService.create(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'updates a operator based on the id',
    description: `
    - For control purposes only -
    This will update the operator on the platform and return the operator
    `,
  })
  @ApiParam({ name: 'id' })
  update(
    @Param() { id }: Record<string, any>,
    @Body() data: OperatorDto,
  ): void {
    this.operatorsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'removes a operator based on the id',
    description: `
    - For control purposes only -
    This will remove the operator on the platform
    `,
  })
  @ApiParam({ name: 'id' })
  destroy(@Param() { id }: Record<string, any>): void {
    this.operatorsService.delete(id);
  }
}
