import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';


@Injectable()
export class LoginEvent {

    @OnEvent('user.login')
    logInEvent(payload: any) {
        console.log('send Email Event', payload);
    }
}

