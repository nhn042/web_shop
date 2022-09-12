import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createCategory{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    describe: string;
}