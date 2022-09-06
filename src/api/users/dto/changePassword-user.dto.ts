import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class changePassword {
  @IsEmail()
  email: string;

  @IsString()
  Password: string;

  @IsString()
  newPassword: string;


  

}
