import { Provider } from "@nestjs/common";
import { Connection } from "typeorm";
import { ORDER_CONST } from "./order.constant";
import { OrderEntity } from "./order.entity";

export const orderProviders: Provider[] = [
    {
        provide: ORDER_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(OrderEntity),
        inject: ['DATABASE_CONNECTION'],
    }
] 