import { Injectable, NotFoundException } from '@nestjs/common';
import { ERROR } from 'src/share/common/error';
import { CategoryRepository } from '../category/category.repository';
import { CategoryService } from '../category/category.service';
import { createProducts } from './dto/products-dto.create';
import { updateProduct } from './dto/products-dto.update';
import { ProductsEntity } from './products.entity';
import { ProductsRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductsService {
    constructor(
        private readonly proRepo: ProductsRepository,
        private readonly categoryService: CategoryService,
        private readonly categoryRepo: CategoryRepository,
        ){}
    async paginate(options: IPaginationOptions): Promise<Pagination<ProductsEntity>> {
        const queryBuilder = this.proRepo.getRepository().createQueryBuilder('c');
       // queryBuilder.orderBy('c.name', 'DESC');
        return paginate<ProductsEntity>(queryBuilder, options);
    }

    async getProductsById(id: string): Promise<ProductsEntity> {
        return await this.proRepo.findOneByCondition({where: {id: id}});
    }

    async createProducts(dto: createProducts, id: string): Promise<ProductsEntity> {
        const product_found = await this.proRepo.findOneByCondition(
            {where: {
                Name: dto.Name,
                category: {
                    id: id,
                },
            },
        });
        if(product_found) {
            throw new NotFoundException(ERROR.PRODUCT_FOUND);
        }
        const category = await this.categoryService.getCategoryById(id);
        
     //   const newProduct = await this.proRepo.save({...dto, category: category})
        return await this.proRepo.save({...dto, category: category})
    }

    

    async updateProducts(id: string, dto: updateProduct): Promise<ProductsEntity> {
        const product_found = await this.proRepo.findOneByCondition(
            {where: {
                Name: dto.Name,
                category: {
                    id: id,
                },
            },
        });
        if(!product_found) {
            throw new NotFoundException(ERROR.PRODUCT_NOT_FOUND);
        }
        const newProduct = await this.proRepo.update(product_found.id, dto);
        return newProduct;
    }

    async deleteProducts(id: string): Promise<ProductsEntity> {
        const product_found = await this.proRepo.findOneByCondition({where: {id: id}})
        if(!product_found) {
            throw new NotFoundException(ERROR.CATEGORY_NOT_FOUND);
        }
        return await this.proRepo.delete(id);
    }
}
