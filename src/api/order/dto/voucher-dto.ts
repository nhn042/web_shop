import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Voucher{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    idVoucher: string;
}