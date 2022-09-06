import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { ERROR } from 'src/share/common/error';
import { order_status } from 'src/share/common/order_status';
import { ProductsRepository } from '../products/products.repository';
import { OrderDetailEntity } from './order_detail.entity';
import { OrderDetailRepository } from './order_detail.repository';
import { createOrder } from '../order/dto/order-dto.create';
import { OrderRepository } from '../order/order.repository';
import { OrderService } from '../order/order.service';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { VoucherEntity } from '../voucher/voucher.entity';

@Injectable()
export class OrderDetailService {
    constructor(private readonly odDetailRepo: OrderDetailRepository,
        private readonly userRepo: UsersService,
        private readonly productService: ProductsService,
        private readonly odRepo: OrderRepository,
        ) {}

    findAll(): Promise<OrderDetailEntity> {
        return this.odDetailRepo.find();
    }

    async findOne(id: string): Promise<OrderDetailEntity>{
        return await this.odDetailRepo.findOneByCondition({where: {id: id}});
    }

    async createOrderDetail(condition: any): Promise<any>{
        const order = condition.order;
        const product = await this.productService.getProductsById(condition.product);
        if(!product) {
            throw new NotFoundException(ERROR.PRODUCT_NOT_FOUND);
        }   
        const Price = product.Price * order.quantityOfstocks;
        
        const newOrderDetail = await this.odDetailRepo.save({
            order: order,
            product: product,
            Price: Price,
            quantityOfstocks: order.quantityOfstocks,
        })
        return newOrderDetail;
    }

    async DeleteOrderDetail(id: string): Promise<OrderDetailEntity> {
        const orderFound = this.odDetailRepo.findOneByCondition({where: {id: id}});
        if(!orderFound) {
            throw new NotFoundException(ERROR.ORDER_NOT_FOUND)
        }
        return await this.odDetailRepo.delete(id);
    }
}
