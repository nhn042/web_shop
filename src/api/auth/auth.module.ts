import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/configs/database/database.module';
import { SendMailModule } from 'src/utils/sendMail/mail.module';
import { UserEntity } from '../users/users.entity';
import { UsersProviders } from '../users/users.provider';
import { UserRepository } from '../users/users.respository';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
//import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { RtStrategy } from './strategies/rt.strategy';
import { AtStrategy } from './strategies/at.strategy';

@Module({
  imports: [
  forwardRef(() => UsersModule),
  TypeOrmModule.forFeature([UserEntity]), 
  DatabaseModule, 
  SendMailModule, 
  PassportModule,
  JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions:{
      expiresIn: '24h'
    }
  })
],
  controllers: [AuthController],
  providers: [UsersService, AuthService, UserRepository, ...UsersProviders, RtStrategy, AtStrategy],
  exports: [
    AuthService, JwtModule
  ]
})
export class AuthModule {}
