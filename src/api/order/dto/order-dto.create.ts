import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createOrder{
    @IsNotEmpty()
    @IsNumber()
    Price: number;

    @IsNotEmpty()
    @IsNumber()
    quantityOfstocks: number;

    @IsNotEmpty()
    @IsString()
    idProduct: string;

    @IsNotEmpty()
    @IsString()
    idVoucher: string;
}