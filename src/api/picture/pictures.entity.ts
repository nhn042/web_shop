
import { ProductsEntity } from '../products/products.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/share/database/base-entity';
import { PICTURES_CONST } from './pictures.constant';

@Entity({ name: PICTURES_CONST.MODEL_NAME })
export class Picture extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @ManyToOne(() => ProductsEntity)
    @JoinColumn({ name: 'id' })
    productId: ProductsEntity;
}
