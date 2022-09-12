import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../users/users.entity';
import { AuthService } from './auth.service';
import { CreateUser } from './dto/auth-dto.create';
import { Login } from './dto/auth-dto.login';
import { Tokens } from './dto/tokens.type';

@ApiTags('Auth')
@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    Login(@Body() dto: Login){      
        return this.authService.Login(dto);
    }

    @Post('register')
    Register(@Body() dto: CreateUser){
        return this.authService.Register(dto);
    }

}