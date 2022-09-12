import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  Dob: Date;

  @ApiProperty()
  @IsNotEmpty()
  isActive: false;
}
