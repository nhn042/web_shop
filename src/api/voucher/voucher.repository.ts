import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeOrmRepository } from 'src/share/database/typeorm.repository';
import { VoucherEntity } from './voucher.entity';
import { VOUCHER_CONST } from './voucher.constant';

@Injectable()
export class VoucherRepository extends TypeOrmRepository<VoucherEntity> {
  constructor(
    @Inject(VOUCHER_CONST.MODEL_PROVIDER)
    voucherEntity: Repository<VoucherEntity>,
  ) {
    super(voucherEntity);
  }
}
