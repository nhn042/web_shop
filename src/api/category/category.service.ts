import { Injectable, NotFoundException } from '@nestjs/common';
import { cate_Role } from 'src/share/common/category.role';
import { ERROR } from 'src/share/common/error';
import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import { createCategory } from './dto/category-dto.create';
import { updateCategory } from './dto/category-dto.update';

@Injectable()
export class CategoryService {
    constructor(private readonly cateRepo: CategoryRepository){}

    async getAllCate(): Promise<CategoryEntity> {
        return await this.cateRepo.find();
    }

    async getCategoryById(id: string): Promise<CategoryEntity> {
        return await this.cateRepo.findOneByCondition({where: {id: id}});
    }

    async getAll(req: any): Promise<CategoryEntity[]> {
        return await this.cateRepo.findAll({where: req});
    }

    async createCategory(category: createCategory): Promise<CategoryEntity> {
        const category_name = category.Name;
        const category_found = await this.cateRepo.findOneByCondition({where: {Name: category_name}})
        if(category_found) {
            throw new NotFoundException(ERROR.CATEGORY_FOUND);
        }
        await this.cateRepo.save(category);
        return;
    }

    async updateCategory(id: string, category: updateCategory): Promise<CategoryEntity> {
        const category_found = await this.cateRepo.findOneByCondition({where: {id: id}})
        if(!category_found) {
            throw new NotFoundException(ERROR.CATEGORY_NOT_FOUND);
        }
        const newCategory = await this.cateRepo.update(category_found.id, category);
        return newCategory;
    }

    async deleteCategory(id: string): Promise<CategoryEntity> {
        const category_found = await this.cateRepo.findOneByCondition({where: {id: id}})
        if(!category_found) {
            throw new NotFoundException(ERROR.CATEGORY_NOT_FOUND);
        }
        return await this.cateRepo.delete(id);
    }
}
