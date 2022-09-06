import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { ERROR } from 'src/share/common/error';
import { order_status } from 'src/share/common/order_status';
import { OrderDetailService } from '../order_detail/order_detail.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { VoucherService } from '../voucher/voucher.service';
import { createOrder } from './dto/order-dto.create';
import { Voucher } from './dto/voucher-dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(private readonly odrepository: OrderRepository,
        private readonly userRepo: UsersService,
        private readonly oderDertailService: OrderDetailService,
        private readonly productRepo: ProductsService,
        private readonly VoucherService: VoucherService,) {}

    findAll(): Promise<OrderEntity> {
        return this.odrepository.find();
    }

    async findOne(id: string): Promise<OrderEntity>{
        return await this.odrepository.findOneByCondition({where: {id: id}});
    }

    async CreateOrder(createOrderDto: createOrder, id: string): Promise<OrderEntity>{
        const user = await this.userRepo.findUserById(id);

        if(!user){
            throw new NotFoundException(ERROR.USER_NOT_FOUND);
        }

        const newOrder = await this.odrepository.save({...createOrderDto, user: user});
        const product = await this.productRepo.getProductsById(createOrderDto.idProduct);    
        if(!product || product.status === 'in_active') {
            throw new BadRequestException(ERROR.PRODUCT_EXISTED);
        }
        const orderProduct = await this.oderDertailService.createOrderDetail(
            {
                order: newOrder,
                product: createOrderDto.idProduct,
            }
        )
        const voucher = await this.VoucherService.findOne(createOrderDto.idVoucher);
        const newPrice = orderProduct.Price - (orderProduct.Price * voucher.Discount/100);
        await this.VoucherService.updateUseVoucher(voucher.id)  
        return await this.odrepository.save({...newOrder, Price: newPrice, voucher: voucher});
    }

    // async useVoucher(dto: Voucher, id: string): Promise<OrderEntity> {
    //     const order = await this.odrepository.findOneByCondition({where: {id: id}});
    //     const voucher = await this.VoucherService.findOne(dto.idVoucher);
    //     console.log(order.createdAt);
        
    //     if(voucher.Date_end < order.createdAt || voucher.Quantity <= 0) {
    //         throw new BadRequestException(ERROR.VOUCHER_EXISTED)
    //     }

    //     const newPrice = order.Price - (order.Price * voucher.Discount/100);
    //     await this.VoucherService.updateUseVoucher(voucher.id)    
    //     return await this.odrepository.save({...order, Price: newPrice})
    // }

    async deleteOrder(id: string): Promise<OrderEntity> {
        const orderFound = this.odrepository.findOneByCondition({where: {id: id}});
        if(!orderFound) {
            throw new NotFoundException(ERROR.ORDER_NOT_FOUND)
        }
        if((await orderFound).status === order_status.active){
            throw new NotFoundException(ERROR.CATEGORY_EXISTED)
        }
        return await this.odrepository.delete(id);
    }
}
