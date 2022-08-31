import { OrderDetailEntity } from './order_detail.entity';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { Roles } from 'src/api/auth/guards/roles.auth';
import { Role } from 'src/share/common/role';
import { RolesGuard } from '../auth/guards/roles.guards';
import { createOrderDetail } from './dto/orderdetail-dto.create';
import { updateOrderDetail } from './dto/orderdetail-dto.update';

@Controller('order-detail')
export class OrderDetailController {
    constructor(private readonly orderDetailService: OrderDetailService){}
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    @Get('')
    findAll(): Promise<OrderDetailEntity>{
        return this.orderDetailService.findAll();
    }

    @Roles(Role.user)
    @UseGuards(RolesGuard)
    @Get('id/:id')
    findOne(@Param('id') id: string): Promise<OrderDetailEntity> {
        return this.orderDetailService.findOne(id);
   }

   @Post('create/:id')
   @Roles(Role.user)
   @UseGuards(RolesGuard)
    createOrderDetail(@Body() createOrderDto: createOrderDetail, @Param() Param): Promise<OrderDetailEntity> {
        return this.orderDetailService.createOrderDetail(createOrderDto, Param.id);
    }

    

    @Roles(Role.user, Role.admin)
    @UseGuards(RolesGuard)
     @Delete('delete/:id')
     DeleteOrderDetail(@Param() id: string): Promise<OrderDetailEntity> {
         return this.orderDetailService.DeleteOrderDetail(id);
     }

     @Roles(Role.user)
     @UseGuards(RolesGuard)
      @Put('update')
      updateOrderDetail(@Param() id: string, @Body() updateOrderDto: updateOrderDetail): Promise<OrderDetailEntity> {
          return this.orderDetailService.updateOrderDetail(id, updateOrderDto);
      }
}
