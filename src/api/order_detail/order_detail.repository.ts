import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeOrmRepository } from 'src/share/database/typeorm.repository';
import { OrderDetailEntity } from './order_detail.entity';
import { ORDERDETAIL_CONST } from './order_detail.constant';

@Injectable()
export class OrderDetailRepository extends TypeOrmRepository<OrderDetailEntity> {
  constructor(
    @Inject(ORDERDETAIL_CONST.MODEL_PROVIDER)
    OrderDetailEntity: Repository<OrderDetailEntity>,
  ) {
    super(OrderDetailEntity);
  }
}
