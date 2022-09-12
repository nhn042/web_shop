import { BaseEntity } from 'src/share/database/base-entity';
import { PRODUCTS_CONST } from "./products.constant";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from 'src/api/category/category.entity';
import { products_status } from 'src/share/common/products.status';
import { OrderDetailEntity } from '../order_detail/order_detail.entity';

@Entity({ name: PRODUCTS_CONST.MODEL_NAME })
export class ProductsEntity extends BaseEntity{
    @Column({ length: 100, unique: true })
    Name: string;

    @Column()
    Price: number;

    @Column({nullable: true})
    PriceImport: number;

    @Column({nullable: true})
    barCode: number;

    @Column({nullable: true})
    weight: number;

    @Column()
    Describe: string;

    @Column({default: null})
    Banner: string;


    @Column({ type: 'enum', enum: products_status, default: products_status.active })
    status: products_status;

    @ManyToOne((type) => CategoryEntity, (category) => category.product)
    category: CategoryEntity;

    @ManyToOne((type) => OrderDetailEntity, (orderDetail) => orderDetail.product)
    orderDetail: OrderDetailEntity;




}