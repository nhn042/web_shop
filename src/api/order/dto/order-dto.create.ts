import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createOrder{

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    Price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantityOfstocks: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    idProduct: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    idVoucher: string;
}