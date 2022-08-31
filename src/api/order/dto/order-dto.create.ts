import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createOrder{
    @IsNotEmpty()
    @IsNumber()
    Price: number;

    @IsNotEmpty()
    @IsString()
    idProduct: string;
}