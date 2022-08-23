import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../users/users.entity';
import { AuthService } from './auth.service';
import { CreateUser } from './dto/auth-dto.create';
import { Login } from './dto/auth-dto.login';

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) {}
    //@UseGuards(AuthGuard('local'))
    @Post('login')
    Login(@Body() dto: Login){
        console.log('111');
        return this.authService.Login(dto);
    }

    @Post('register')
    Register(@Body() dto: CreateUser): Promise<UserEntity>{
        return this.authService.Register(dto);
    }
}