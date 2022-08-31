import { forwardRef, Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { DatabaseModule } from 'src/configs/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { OrderDetailRepository } from './order_detail.repository';
import { orderDetailProviders } from './order_detail.provider';
import { ProductsRepository } from '../products/products.repository';
import { ProductsModule } from '../products/products.module';
import { OrderModule } from '../order/order.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, JwtModule, ProductsModule, forwardRef(() => OrderModule), UsersModule],
  providers: [OrderDetailService, OrderDetailRepository, ...orderDetailProviders],
  controllers: [OrderDetailController],
  exports: [OrderDetailService]
})
export class OrderDetailModule {}
