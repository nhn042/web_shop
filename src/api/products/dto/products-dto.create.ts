import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createProducts{

    @IsNotEmpty()
    @IsString()
    Name: string;

    
    // @IsNotEmpty()
    // @IsNumber()
    // barCode: number;

    // @IsNotEmpty()
    // @IsNumber()
    // weight: number;

    // @IsNotEmpty()
    // @IsNumber()
    // PriceImport: number;

    @IsNotEmpty()
    @IsNumber()
    Price: number;

    @IsNotEmpty()
    @IsString()
    Describe: string;

    // @IsNotEmpty()
    // @IsString()
    // Banner: string;

    // @IsNotEmpty()
    // @IsNumber()
    // discount: number;
}