import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Role } from "src/share/common/role";
import { ROLES_KEY } from "./roles.auth";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector){

    }
    async canActivate(context: ExecutionContext) {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if(!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: "Unauthorized user"})
            }   
            const user = await this.jwtService.verifyAsync(token, {
                secret: 'at-secret',
            })

            return requiredRoles.includes(user.roles)
        } catch (e) {
            throw new HttpException("fault", HttpStatus.FORBIDDEN)
        }
    }
}