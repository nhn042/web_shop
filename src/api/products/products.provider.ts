import { Provider } from "@nestjs/common";
import { Connection } from "typeorm";
import { PRODUCTS_CONST } from "./products.constant";
import { ProductsEntity } from "./products.entity";

export const productsProviders: Provider[] = [
    {
        provide: PRODUCTS_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(ProductsEntity),
        inject: ['DATABASE_CONNECTION'],
    }
] 