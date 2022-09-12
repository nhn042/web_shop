import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class updateProduct{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    Price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Describe: string;
}