import { Provider } from "@nestjs/common";
import { Connection } from "typeorm";
import { ORDERDETAIL_CONST } from "./order_detail.constant";
import { OrderDetailEntity } from "./order_detail.entity";

export const orderDetailProviders: Provider[] = [
    {
        provide: ORDERDETAIL_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(OrderDetailEntity),
        inject: ['DATABASE_CONNECTION'],
    }
] 