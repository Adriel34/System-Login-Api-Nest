import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-guards';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from 'src/decorators/is-public.decorator';

  
  @Controller()
  export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest) {
      return this.authService.login(req.user);
    }
  }