import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { cate_Role } from 'src/share/common/category.role';
import { Role } from 'src/share/common/role';
import { Roles } from '../auth/guards/roles.auth';
import { RolesGuard } from '../auth/guards/roles.guards';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { createCategory } from './dto/category-dto.create';
import { updateCategory } from './dto/category-dto.update';

@ApiTags('Category')
@Controller('category')
@ApiBearerAuth()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Get('user')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    getAllCate(): Promise<CategoryEntity> {
        return this.categoryService.getAllCate();
    }

    @Get('user/:id')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    getCategoryById(@Param('id') id: string): Promise<CategoryEntity> {
        return this.categoryService.getCategoryById(id);
    }


    @Get('admin')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    getAll(): Promise<CategoryEntity[]> {
        return this.categoryService.getAll({status: cate_Role.active});
    }
    
    @Post('create')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    createCategory(@Body() category: createCategory): Promise<CategoryEntity> {
        return this.categoryService.createCategory(category);
    }

    @Post('update')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    updateCategory(@Param('id') id: string, @Body() category: updateCategory): Promise<CategoryEntity> {
        return this.categoryService.updateCategory(id, category);
    }

    @Delete('delete/:id')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    deleteCategory(@Param('id') id: string): Promise<CategoryEntity> {
        return this.categoryService.deleteCategory(id);
    }
}
