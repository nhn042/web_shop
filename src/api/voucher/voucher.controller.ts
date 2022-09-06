import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/api/auth/guards/roles.auth';
import { Role } from 'src/share/common/role';
import { RolesGuard } from '../auth/guards/roles.guards';
import { createVoucher } from './dto/vocher-dto.create';
import { updateVoucher } from './dto/voucher-dto.update';
import { VoucherEntity } from './voucher.entity';
import { VoucherService } from './voucher.service';


@Controller('voucher')
export class VoucherController {
    constructor(private readonly voucherService: VoucherService){}
    @Get('')
    @UseGuards(RolesGuard)
    findAll(): Promise<VoucherEntity>{
        return this.voucherService.findAll();
    }

    @Get('id/:id')
    @UseGuards(RolesGuard)
    findOne(@Param('id') id: string): Promise<VoucherEntity> {
        return this.voucherService.findOne(id);
   }

   @Post('create')
   @Roles(Role.admin)
   @UseGuards(RolesGuard)
    createVoucher(@Body() createVoucherDto: createVoucher): Promise<VoucherEntity> {
        return this.voucherService.createVoucher(createVoucherDto);
    }

    @Put('update')
    @Roles(Role.admin)
    updateVoucher(@Param('id') id: string, @Body() dto: updateVoucher): Promise<VoucherEntity> {
        return this.voucherService.updateVoucher(id, dto);
    }

    @Delete('delete/:id')
    @Post('update')
    @Roles(Role.admin)
    deleteVoucher(@Param('id') id: string) {
        return this.voucherService.deleteVoucher(id);
    }

}
