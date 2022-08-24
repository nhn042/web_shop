import { BaseEntity } from 'src/share/database/base-entity';
import { USER_CONST } from './user.constant';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { OrderEntity } from 'src/order/order.entity';
import { Role } from 'src/share/common/role';

// export enum Roles {
//     user = 'user',
//     admin = 'admin',
// }
@Entity({ name: USER_CONST.MODEL_NAME })
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, unique: true })
    fullName: string;

    @Column({ length: 100, default: null })
    email: string;

    @Column({ length: 100 })
    password: string;
    
    @Column()
    phone: number;

    @Column()
    Dob: Date;

    @Column()
    isActive: boolean;

    @Column({default: 0})
    activeCode: number;

    @Column({ type: 'enum', enum: Role, default: Role.user })
    Role: Role;

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];

}