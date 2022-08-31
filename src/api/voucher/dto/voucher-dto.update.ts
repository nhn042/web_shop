import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class updateVoucher {
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