import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/configs/database/database.module';
import { CategoryModule } from '../category/category.module';
import { CategoryRepository } from '../category/category.repository';
import { CategoryService } from '../category/category.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PicturesService } from '../picture/pictures.service';
import { PicturesModule } from '../picture/pitures.module';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.provider';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
    imports:[DatabaseModule, JwtModule, CategoryModule, PicturesModule, CloudinaryModule],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository, ...productsProviders],
    exports: [ProductsRepository, ProductsService]
})
export class ProductsModule {}
