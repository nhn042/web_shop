import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { config } from './configs/typeorm.config';
import { OrderModule } from './order/order.module';
import { Order } from './order';



@Module({
  imports: [AuthModule ,UsersModule, TypeOrmModule.forRoot(config), OrderModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
