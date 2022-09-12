import { Provider } from "@nestjs/common";
import { Connection } from "typeorm";
import { PICTURES_CONST } from "./pictures.constant";
import { Picture } from "./pictures.entity";

export const picturesProviders: Provider[] = [
    {
        provide: PICTURES_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(Picture),
        inject: ['DATABASE_CONNECTION'],
    }
] 