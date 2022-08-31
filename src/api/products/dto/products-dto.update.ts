import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class updateProduct{
    // @IsNotEmpty()

    // id: string;
    
    @IsNotEmpty()
    @IsString()
    Name: string;

    @IsNotEmpty()
    @IsNumber()
    Price: number;

    @IsNotEmpty()
    @IsString()
    Describe: string;
}