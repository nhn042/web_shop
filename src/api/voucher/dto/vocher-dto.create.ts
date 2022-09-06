import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { OrderEntity } from "src/api/order/order.entity";
import { ManyToOne } from "typeorm";

export class createVoucher {
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    Name: string;

    @IsNotEmpty()
    @IsNumber()
    Discount: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    Decribe: string;

    @IsDate()
    Date_start: Date;

    @IsDate()
    Date_end: Date;
}