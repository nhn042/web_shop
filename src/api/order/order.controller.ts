import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/api/auth/guards/roles.auth';
import { Role } from 'src/share/common/role';
import { RolesGuard } from '../auth/guards/roles.guards';
import { createOrder } from './dto/order-dto.create';
import { Voucher } from './dto/voucher-dto';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}
    @Get('')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    findAll(): Promise<OrderEntity>{     
        return this.orderService.findAll();
    }

    @Get('id/:id')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    findOne(@Param('id') id: string): Promise<OrderEntity> {
        return this.orderService.findOne(id);
   }

   @Post('create/:id')
   @Roles(Role.user)
   @UseGuards(RolesGuard)
    createOrder(@Body() createOrderDto: createOrder, @Param() Param): Promise<OrderEntity> {
        return this.orderService.CreateOrder(createOrderDto, Param.id);
    }

    @Post('create/useVoucher/:id')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
     useVoucher(@Body() dto: Voucher, @Param('id') id: string): Promise<OrderEntity> {
         return this.orderService.useVoucher(dto, id);
     }
//     // @Put('update')
//     // updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto): Promise<UserEntity> {
//     //     return this.userService.updateUserById(id, updateUser);
//     // }

    @Delete('delete/:id')
    deleteOrder(@Param('id') id: string) {
        return this.orderService.deleteOrder(id);
    }

}