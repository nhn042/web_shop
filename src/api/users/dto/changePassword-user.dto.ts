import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class changePassword {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  Password: string;

  @ApiProperty()
  @IsString()
  newPassword: string;


  

}
