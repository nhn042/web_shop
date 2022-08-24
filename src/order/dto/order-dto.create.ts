import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createOrder{
    
    id: string;

    @IsNotEmpty()
    @IsNumber()
    Price: number;

    @IsNotEmpty()
    @IsString()
    Status: boolean;
}