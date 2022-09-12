import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { OrderEntity } from "src/api/order/order.entity";
import { ManyToOne } from "typeorm";

export class createVoucher {

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
    Quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Describe: string;

    @ApiProperty()
    @IsDate()
    Date_start: Date;

    @ApiProperty()
    @IsDate()
    Date_end: Date;
}