import { BaseEntity } from 'src/share/database/base-entity';
import { CATEGORY_CONST } from './category.constant';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from 'src/share/common/role';
import { ProductsEntity } from 'src/api/products/products.entity';
import { type } from 'os';
import { cate_Role } from 'src/share/common/category.role';

@Entity({ name: CATEGORY_CONST.MODEL_NAME })
export class CategoryEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, unique: true })
    Name: string;

    @Column({default: 0})
    describe: string;

    @Column({ type: 'enum', enum: cate_Role, default: cate_Role.active })
    status: cate_Role;

    @OneToMany((type) => ProductsEntity, (product) => product.category)
    products: ProductsEntity;
    


}