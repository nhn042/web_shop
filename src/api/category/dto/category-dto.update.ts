import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class updateCategory{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    describe: string;
}