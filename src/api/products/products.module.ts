import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/configs/database/database.module';
import { CategoryModule } from '../category/category.module';
import { CategoryRepository } from '../category/category.repository';
import { CategoryService } from '../category/category.service';
import { ProductsController } from './products.controller';
import { ProductsEntity } from './products.entity';
import { productsProviders } from './products.provider';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
    imports:[DatabaseModule, JwtModule, CategoryModule],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository, ...productsProviders],
    exports: [ProductsRepository, ProductsService]
})
export class ProductsModule {}
