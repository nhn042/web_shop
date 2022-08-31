import { Injectable, NotFoundException } from '@nestjs/common';
import { VoucherEntity } from './voucher.entity';
import { ERROR } from 'src/share/common/error';
import { VoucherRepository } from './voucher.repository';
import { createVoucher } from './dto/vocher-dto.create';
import { updateVoucher } from './dto/voucher-dto.update';

@Injectable()
export class VoucherService {
    constructor(private readonly voucherRepo: VoucherRepository) {}
    findAll(): Promise<VoucherEntity> {

        return this.voucherRepo.find();
    }

    async findOne(id: string): Promise<VoucherEntity>{
        return await this.voucherRepo.findOneByCondition({where: {id: id}});
    }

    async createVoucher(createVoucherDto: createVoucher): Promise<VoucherEntity> {
        const voucherFound = await this.voucherRepo.findOneByCondition({where: {Name: createVoucherDto.Name}});
        if(voucherFound) {
            voucherFound.Quantity++;
            return await this.voucherRepo.save(voucherFound);
        }
        return await this.voucherRepo.save(createVoucherDto);
    }

    async updateUseVoucher(id: string): Promise<VoucherEntity> {
        const voucherFound = await this.voucherRepo.findOneByCondition({where: {id: id}});
        if(!voucherFound) {
            throw new NotFoundException(ERROR.VOUCHER_FOUND);
        }
        voucherFound.Quantity--;
        return await this.voucherRepo.save(voucherFound);
    }

    async updateVoucher(id: string, dto: updateVoucher): Promise<VoucherEntity> {
        const voucherFound = await this.voucherRepo.findOneByCondition({where: {id: id}});
        if(!voucherFound) {
            throw new NotFoundException(ERROR.VOUCHER_NOT_FOUND.MESSAGE);
        }
        const voucherUpdate = this.voucherRepo.update(id, dto);
        return voucherUpdate;
    }
}
