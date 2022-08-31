import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeOrmRepository } from 'src/share/database/typeorm.repository';
import { PRODUCTS_CONST } from './products.constant';
import { ProductsEntity } from './products.entity';

@Injectable()
export class ProductsRepository extends TypeOrmRepository<ProductsEntity> {
  constructor(
    @Inject(PRODUCTS_CONST.MODEL_PROVIDER)
    productsEntity: Repository<ProductsEntity>,
  ) {
    super(productsEntity);
  }
}
