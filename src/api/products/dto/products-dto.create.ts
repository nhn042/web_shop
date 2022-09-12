import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createProducts{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    barCode: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    PriceImport: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    Price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Describe: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Banner: string;
}