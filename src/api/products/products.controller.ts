import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/share/common/role';
import { Roles } from '../auth/guards/roles.auth';
import { RolesGuard } from '../auth/guards/roles.guards';
import { createProducts } from './dto/products-dto.create';
import { updateProduct } from './dto/products-dto.update';
import { ProductsEntity } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get('user')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    getAllProducts(): Promise<ProductsEntity> {
        return this.productsService.getAllProducts();
    }

    @Get('user/:id')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    getProductsById(@Param('id') id: string): Promise<ProductsEntity> {
        return this.productsService.getProductsById(id);
    }

    @Post('create')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    createProducts(@Body() dto: createProducts, @Param() param): Promise<ProductsEntity> {    
        
        return this.productsService.createProducts(dto, param.id);
    }

    @Post('update')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    updateProducts(@Param('id') id: string, @Body() dto: updateProduct): Promise<ProductsEntity> {
        return this.productsService.updateProducts(id, dto);
    }
}
