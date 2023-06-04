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
       //@TODO CORRIGE ERRO 500
    return this.userService.deleteUser(id);
  }

  @Patch('update-user')
  updateUser(@Body() body: any) {
    //@TODO ADICIONA TIPAGEM
    return this.userService.updateUser(body); 
  }
}
