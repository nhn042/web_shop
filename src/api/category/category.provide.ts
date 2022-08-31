import { Provider } from "@nestjs/common";
import { Connection } from "typeorm";
import { CATEGORY_CONST } from "./category.constant";
import { CategoryEntity } from "./category.entity";

export const categoryProviders: Provider[] = [
    {
        provide: CATEGORY_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(CategoryEntity),
        inject: ['DATABASE_CONNECTION'],
    }
] 