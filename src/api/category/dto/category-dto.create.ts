import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createCategory{
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    Name: string;

    @IsNotEmpty()
    @IsString()
    describe: string;
}