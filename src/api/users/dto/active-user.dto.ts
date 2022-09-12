import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class activeUser{
    @ApiProperty()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsNumber()
    otp: number;
  
}