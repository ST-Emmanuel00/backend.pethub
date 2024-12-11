import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { IResponse } from "../../common/types";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { LoginDto } from "../dto";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class LogInServices {

    constructor(
        private readonly jwtService: JwtService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    async logIn(loginData: LoginDto): Promise<IResponse> {

        const token = this.jwtService.sign({ saludo: "hello" }, {
            expiresIn: '1h',
        });

        this.eventEmitter.emit('user.login', { message: 'Hello, Event!' })

        return {
            message: ['User logged in successfully'],
            data: { loginData, token }
        }
    }
}

