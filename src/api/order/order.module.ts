import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { orderProviders } from './order.provider';
import { DatabaseModule } from 'src/configs/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { OrderDetailModule } from '../order_detail/order_detail.module';
import { OrderDetailService } from '../order_detail/order_detail.service';
import { OrderDetailRepository } from '../order_detail/order_detail.repository';
import { ProductsModule } from '../products/products.module';
import { VoucherModule } from '../voucher/voucher.module';

@Module({
  imports: [DatabaseModule, JwtModule, UsersModule, ProductsModule, OrderDetailModule, VoucherModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, ...orderProviders],
  exports: [OrderRepository]
})
export class OrderModule {}
