import { Body, Controller, Get, Param, Post, UseGuards, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { Role } from 'src/share/common/role';
import { Roles } from '../auth/guards/roles.auth';
import { RolesGuard } from '../auth/guards/roles.guards';
import { createProducts } from './dto/products-dto.create';
import { updateProduct } from './dto/products-dto.update';
import { ProductsEntity } from './products.entity';
import { ProductsService } from './products.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get('')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    getAllProducts(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    ): Promise<Pagination<ProductsEntity>> {
        const options: IPaginationOptions = {
            limit,
            page,
            route: 'http://localhost:3000/products',
        };
        return this.productsService.paginate(options);
    }

    @Get('user/:id')
    @Roles(Role.user, Role.admin)
    @UseGuards(RolesGuard)
    getProductsById(@Param('id') id: string): Promise<ProductsEntity> {
        return this.productsService.getProductsById(id);
    }

    @Post('create/:id')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    createProducts(@Body() dto: createProducts, @Param() param): Promise<ProductsEntity> {    
        
        return this.productsService.createProducts(dto, param.id);
    }

    @Post('update')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    updateProducts(@Param('id') id: string, @Body() dto: updateProduct): Promise<ProductsEntity> {
        return this.productsService.updateProducts(id, dto);
    }
}
