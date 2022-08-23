import { Provider } from "@nestjs/common";
import { Connection } from "typeorm";
import { USER_CONST } from "./user.constant";
import { UserEntity } from "./users.entity";

export const UsersProviders: Provider[] = [
    {
        provide: USER_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(UserEntity),
        inject: ['DATABASE_CONNECTION'],
    }
] 