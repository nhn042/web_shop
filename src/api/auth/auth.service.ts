import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { ERROR } from 'src/share/common/error';
import { UserEntity } from '../users/users.entity';
import { UserRepository } from '../users/users.respository';
import { CreateUser } from './dto/auth-dto.create';
import { Login } from './dto/auth-dto.login';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './dto/tokens.type';
import { Role } from 'src/share/common/role';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService){}

    async Register(dto: CreateUser) {
        const user = await this.userService.CreateUser(dto);
        return user;
    }

    async getToken(id: string, email: string, roles: Role): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: id,
                    roles: roles,
                    email,
                },
                {
                    secret: 'at-secret',
                    expiresIn: 60 * 15,
                },
            ),
            this.jwtService.sign(
                {
                    sub: id,
                    roles: roles,
                    email,
                },
                {
                    secret: 'rt-secret',
                    expiresIn: 60 * 60 * 24 * 7,
                },
            ),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        }
    }

    async Login(dto: Login) {
        const user = await this.userService.validateUser(dto);
        const isActive = user.isActive;
        if(!isActive) {
            throw new NotFoundException(ERROR.USER_EXISTED)
        }
        const tokens = await this.getToken(user.id, user.email, user.Role);
        return tokens;
    }
}