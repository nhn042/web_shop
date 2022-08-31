import { BaseEntity } from 'src/share/database/base-entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VOUCHER_CONST } from './voucher.constant';
import { voucher_status } from 'src/share/common/voucher.status';
import { OrderEntity } from '../order/order.entity';

@Entity({ name: VOUCHER_CONST.MODEL_NAME })
export class VoucherEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ default: 0 })
    Name: string;

    @Column()
    Discount: number;

    @Column()
    Quantity: number;

    @Column()
    Describe: string;

    @Column()
    Date_start: Date;

    @Column()
    Date_end: Date;

    @Column({ type: 'enum', enum: voucher_status, default: voucher_status.active })
    status: voucher_status;

    @OneToMany(() => OrderEntity, (order) => order.voucher)
    order: OrderEntity;




}