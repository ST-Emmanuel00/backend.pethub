import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IResponse } from './common/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("health")
  health(): IResponse {
    return this.appService.health();
  }
}
