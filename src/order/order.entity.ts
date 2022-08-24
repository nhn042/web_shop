import { BaseEntity } from 'src/share/database/base-entity';
import { ORDER_CONST } from "./order.constant";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/api/users/users.entity';

@Entity({ name: ORDER_CONST.MODEL_NAME })
export class OrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ default: 0 })
    Price: number;

    @Column({ default: null })
    Status: boolean;

    @ManyToOne(() => UserEntity, (user) => user.orders, {
        eager: true,
      })
      user: UserEntity;


}