import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/api/users/users.entity';

export class CreateUser extends UserEntity{
//   @IsNotEmpty()
//   @IsString()
//   id: string;
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
  @IsString()
  fullName: string;

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
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  activeCode: number;
  
}
