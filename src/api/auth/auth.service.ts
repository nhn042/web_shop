import { Injectable, NotFoundException} from '@nestjs/common';
import { ERROR } from 'src/share/common/error';
import { UserEntity } from '../users/users.entity';
import { UserRepository } from '../users/users.respository';
import { CreateUser } from './dto/auth-dto.create';
import { Login } from './dto/auth-dto.login';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService){}

    async Register(dto: CreateUser): Promise<UserEntity> {
        const user = await this.userService.CreateUser(dto);
        return user;
    }

    async getToken(id: string, email: string) {
        const payload = {
            sub: id,
            email: email,
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async Login(dto: Login) {
        const user = await this.userService.validateUser(dto);
        const payload = {
            email: user.email,
            sub: user.id,
        }
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}