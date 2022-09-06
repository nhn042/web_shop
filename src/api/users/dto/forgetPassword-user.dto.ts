import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class forgetPassword {
  @IsEmail()
  email: string;

  @IsNumber()
  otp: number;

  @IsString()
  newPassword: string;


  

}
