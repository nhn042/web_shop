import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req } from '@nestjs/common';
import { Roles } from 'src/api/auth/guards/roles.auth';
import { createOrder } from './dto/order-dto.create';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}
    //@Roles("")
    @Get('')
    findAll(): Promise<OrderEntity>{
        return this.orderService.findAll();
    }

    @Get('id/:id')
    findOne(@Param('id') id: string): Promise<OrderEntity> {
        return this.orderService.findOne(id);
   }

   //@Roles("admin")
    @Post('create')
    createOrder(@Body() createOrderDto: createOrder, @Req() req: any): Promise<OrderEntity> {
        return this.orderService.CreateUser(createOrderDto, req);
    }

//     // @Put('update')
//     // updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto): Promise<UserEntity> {
//     //     return this.userService.updateUserById(id, updateUser);
//     // }

//     @Delete('delete/:id')
//     deleteOrder(@Param('id') id: string) {
//         return this.orderService.deleteUser(id);
//     }

}
