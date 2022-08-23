import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/api/users/users.entity';

export class CreateUser extends UserEntity{
//   @IsNotEmpty()
//   @IsString()
//   id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsDate()
  Dob: Date;

  @IsNotEmpty()
  isActive: false;

  @IsNotEmpty()
  @IsNumber()
  activeCode: number;
  
}
