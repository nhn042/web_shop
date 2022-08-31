import { BaseEntity } from 'src/share/database/base-entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/api/users/users.entity';
import { order_status } from 'src/share/common/order_status';
import { ORDERDETAIL_CONST } from './order_detail.constant';
import { OrderEntity } from '../order/order.entity';
import { ProductsEntity } from '../products/products.entity';
import { VoucherEntity } from '../voucher/voucher.entity';

@Entity({ name: ORDERDETAIL_CONST.MODEL_NAME })
export class OrderDetailEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ default: 0 })
    quantityOfstocks: number;

    @Column({ default: 0 })
    Price: number;

    @ManyToOne(() => OrderEntity, (order) => order.orderDetail, {
      })
      order: OrderEntity;
    
    @ManyToOne(() => ProductsEntity, (product) => product.orderDetail, {
    })
    product: ProductsEntity;

    @ManyToOne(() => VoucherEntity, (voucher) => voucher.order,{})
    voucher: VoucherEntity;
}