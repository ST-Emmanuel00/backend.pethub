import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { LogInServices } from './services';
import { CommonModule } from '../common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { envValues } from 'src/common/config';
import { LoginEvent } from './events';

@Module({
  imports: [CommonModule,
    JwtModule
      .registerAsync({
        useFactory: () => ({
          secret: envValues.jwt_key,
        })
      }),
  ],
  controllers: [AccessController],
  providers: [LogInServices, LoginEvent],
})
export class AccessModule { }
