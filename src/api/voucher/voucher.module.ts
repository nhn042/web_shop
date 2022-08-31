import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { DatabaseModule } from 'src/configs/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { VoucherRepository } from './voucher.repository';
import { voucherProviders } from './voucher.provider';

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [VoucherService, VoucherRepository, ...voucherProviders],
  controllers: [VoucherController],
  exports: [VoucherService]
})
export class VoucherModule {}