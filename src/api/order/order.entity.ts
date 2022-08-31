import { BaseEntity } from 'src/share/database/base-entity';
import { ORDER_CONST } from "./order.constant";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/api/users/users.entity';
import { order_status } from 'src/share/common/order_status';
import { OrderDetailEntity } from '../order_detail/order_detail.entity';
import { VoucherEntity } from '../voucher/voucher.entity';

@Entity({ name: ORDER_CONST.MODEL_NAME })
export class OrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ default: 0 })
    Price: number;

    @Column({ type: 'enum', enum: order_status, default: order_status.active })
    status: order_status;

    @ManyToOne(() => UserEntity, (user) => user.order, {
        eager: true,
      })
      user: UserEntity;
    @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetailEntity;

    @ManyToOne(() => VoucherEntity, (voucher) => voucher.order)
    voucher: VoucherEntity;




}