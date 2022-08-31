import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { ERROR } from 'src/share/common/error';
import { order_status } from 'src/share/common/order_status';
import { ProductsRepository } from '../products/products.repository';
import { createOrderDetail } from './dto/orderdetail-dto.create';
import { updateOrderDetail } from './dto/orderdetail-dto.update';
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
    constructor(private readonly odDetailrepository: OrderDetailRepository,
        private readonly userRepo: UsersService,
        private readonly productService: ProductsService,
        private readonly odrepository: OrderRepository,
    //    private readonly odService: OrderService,
        ) {}

    findAll(): Promise<OrderDetailEntity> {
        return this.odDetailrepository.find();
    }

    async findOne(id: string): Promise<OrderDetailEntity>{
        return await this.odDetailrepository.findOneByCondition({where: {id: id}});
    }

    async createOrderDetail(dto: createOrderDetail, id: string): Promise<OrderDetailEntity>{
        const user = await this.userRepo.findUserById(id);
        const product = await this.productService.getProductsById(dto.idProduct);
        if(product.status === 'in_active') {
            throw new BadRequestException(ERROR.PRODUCT_EXISTED);
        }
        const Price = product.Price * dto.quantityOfStocks;
        const newOrder = await this.odrepository.save({...createOrderDetail, order: user, product: product, Price: Price});
        console.log(newOrder);
        
        return;
    }

    async DeleteOrderDetail(id: string): Promise<OrderDetailEntity> {
        const orderFound = this.odDetailrepository.findOneByCondition({where: {id: id}});
        if(!orderFound) {
            throw new NotFoundException(ERROR.ORDER_NOT_FOUND)
        }
        return await this.odDetailrepository.delete(id);
    }

    async updateOrderDetail(id: string, dto: updateOrderDetail): Promise<OrderDetailEntity>{
        const orderDetailFound = await this.odDetailrepository.findOneByCondition({where: {id: id}});
        if(!orderDetailFound) {
            throw new NotFoundException(ERROR.ORDER_NOT_FOUND.MESSAGE);
        }
        const newOrderDetail = this.odDetailrepository.update(orderDetailFound.id, updateOrderDetail);
        return newOrderDetail;
    }
}
