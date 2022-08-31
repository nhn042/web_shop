import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createOrderDetail {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsNumber()
    @IsNotEmpty()
    quantityOfStocks: number;
    
    @IsNotEmpty()
    @IsString()
    idProduct: string;
}