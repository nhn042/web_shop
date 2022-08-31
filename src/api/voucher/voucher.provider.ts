import { Provider } from "@nestjs/common";
import { Connection } from "typeorm";
import { VOUCHER_CONST } from "./voucher.constant";
import { VoucherEntity } from "./voucher.entity";

export const voucherProviders: Provider[] = [
    {
        provide: VOUCHER_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(VoucherEntity),
        inject: ['DATABASE_CONNECTION'],
    }
] 