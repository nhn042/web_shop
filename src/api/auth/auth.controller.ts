import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../users/users.entity';
import { AuthService } from './auth.service';
import { CreateUser } from './dto/auth-dto.create';
import { Login } from './dto/auth-dto.login';
import { Tokens } from './dto/tokens.type';

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) {}
    //@UseGuards(AuthGuard('jwt'))
    @Post('login')
    Login(@Body() dto: Login){
        console.log(process.env.PRIVATE_KEY_AT);
        
        return this.authService.Login(dto);
    }

    @Post('register')
    Register(@Body() dto: CreateUser): Promise<Tokens>{
        return this.authService.Register(dto);
    }
}