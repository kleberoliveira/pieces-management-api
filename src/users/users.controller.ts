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
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBasicAuth()
@UseGuards(BasicAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'returns all users registered on the application',
    description: `
    - For control purposes only -
    This will return all registered users on the application
    `,
  })
  index(): Promise<Array<User>> {
    return this.usersService.findAll();
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
  show(@Param() { id }: Record<string, any>): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'creates and returns the user',
    description: `
    - For control purposes only -
    This will create the user on the platform and return the user
    `,
  })
  store(@Body() data: UserDto): Promise<User> {
    return this.usersService.create(data);
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
  update(@Param() { id }: Record<string, any>, @Body() data: UserDto): void {
    this.usersService.update(id, data);
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
    this.usersService.delete(id);
  }
}
