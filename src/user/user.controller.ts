import {
  Body,
  Headers,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('all-users')
  findAllUsers(@Headers('authorization') token: string) {
    return this.userService.findAllUsers(token);
  }

  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Patch('update-user')
  updateUser(@Param() userData: User) {
    return this.userService.updateUser(userData);
  }
}
