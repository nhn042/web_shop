import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { orderProviders } from './order.provider';
import { DatabaseModule } from 'src/configs/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [OrderService, OrderRepository, ...orderProviders],
  controllers: [OrderController]
})
export class OrderModule {}
