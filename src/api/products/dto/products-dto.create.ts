import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createProducts{
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    Name: string;

    
    @IsNotEmpty()
    @IsNumber()
    barCode: number;

    @IsNotEmpty()
    @IsNumber()
    Price: number;

    @IsNotEmpty()
    @IsString()
    Describe: string;

    // @IsNotEmpty()
    // @IsNumber()
    // discount: number;
}