import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ErrorMsg } from "src/common/utils";

@Injectable()
export class CheckAuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {

        try {
            const req = context.switchToHttp().getRequest();
            const token = req.headers["auth-token"];

            if (!token) {
                throw new ErrorMsg("Token not found", 401);
            }

            // Validate if the token is a valid JWT token
            if (!this.jwtService.decode(token)) {
                throw new ErrorMsg("Invalid token", 401);
            }

            const decodedToken = this.jwtService.verify(token);

            if (!decodedToken) {
                throw new ErrorMsg("Invalid token", 401);
            }
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < currentTime) {
                throw new ErrorMsg("Token expired", 401);
            }

            return true;
        } catch (error) {
            throw error
        }
    }

}