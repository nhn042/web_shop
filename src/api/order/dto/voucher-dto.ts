import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Voucher{
    @IsNotEmpty()
    @IsString()
    idVoucher: string;
}