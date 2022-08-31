import { IsNotEmpty, IsString } from "class-validator";

export class updateCategory{
    // @IsNotEmpty()

    // id: string;
    
    @IsNotEmpty()
    @IsString()
    Name: string;

    @IsNotEmpty()
    @IsString()
    describe: string;
}