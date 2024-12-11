import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LogInServices } from './services';
import { LoginDto } from './dto';

@Controller('access')
export class AccessController {
  constructor(private readonly loginServices: LogInServices) { }

  @Post('login')
  logIn(@Body() loginData: LoginDto) {
    return this.loginServices.logIn(loginData);
  }
}
