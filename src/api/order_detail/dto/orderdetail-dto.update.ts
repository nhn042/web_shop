import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class updateOrderDetail {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsNumber()
    @IsNotEmpty()
    quantityOfStocks: number;
}