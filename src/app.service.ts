import { Injectable } from '@nestjs/common';
import { IResponse } from './common/types';

@Injectable()
export class AppService {
  health(): IResponse {
    return {
      message: ["Pethub is okay!"],
    };
  }
}
