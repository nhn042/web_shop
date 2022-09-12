import { Body, Controller, Get, Param, Post, UseGuards, ParseIntPipe, Query, DefaultValuePipe, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Role } from 'src/share/common/role';
import { Roles } from '../auth/guards/roles.auth';
import { RolesGuard } from '../auth/guards/roles.guards';
import { createProducts } from './dto/products-dto.create';
import { updateProduct } from './dto/products-dto.update';
import { ProductsEntity } from './products.entity';
import { ProductsService } from './products.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Product')
@Controller('products')
@ApiBearerAuth()
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
    @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 5}]))
    createProducts(@Body() dto: createProducts, @Param() param, @UploadedFiles() files: { files: Express.Multer.File[]}){    
        
        return this.productsService.createProducts(dto, param.id, files.files);
    }

    @Post('update')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    updateProducts(@Param('id') id: string, @Body() dto: updateProduct): Promise<ProductsEntity> {
        return this.productsService.updateProducts(id, dto);
    }
}
