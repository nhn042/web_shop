import { Injectable } from '@nestjs/common';
import { createOrder } from './dto/order-dto.create';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(private readonly odrepository: OrderRepository) {}

    findAll(): Promise<OrderEntity> {
        return this.odrepository.find();
    }

    async findOne(id: string): Promise<OrderEntity>{
        return await this.odrepository.findOneByCondition({where: {id: id}});
    }

    async CreateUser(createOrderDto: createOrder, req): Promise<OrderEntity>{
        const userID = req.user.id;
        const newOrder = this.odrepository.save({...createOrderDto, userID});
        return newOrder;
    }
}
