import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { config } from './configs/typeorm.config';
import { OrderModule } from './api/order/order.module';
import { ProductsModule } from './api/products/products.module';
import { CategoryModule } from './api/category/category.module';
import { OrderDetailModule } from './api/order_detail/order_detail.module';
import { VoucherModule } from './api/voucher/voucher.module';



@Module({
  imports: [AuthModule ,UsersModule, TypeOrmModule.forRoot(config), OrderModule, ProductsModule, CategoryModule, OrderDetailModule, VoucherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
