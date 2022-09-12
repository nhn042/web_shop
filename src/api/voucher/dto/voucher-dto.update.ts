import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class updateVoucher {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    Discount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Decribe: string;

    @ApiProperty()
    @IsDate()
    Date_start: Date;

    @ApiProperty()
    @IsDate()
    Date_end: Date;
}