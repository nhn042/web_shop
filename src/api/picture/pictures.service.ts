
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { Injectable } from '@nestjs/common';
import { PictureRepository } from './picture.repository';
import { ProductsEntity } from '../products/products.entity';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/products.repository';

@Injectable()
export class PicturesService {
    constructor(private pictureRepo: PictureRepository,
         private cloudinaryService: CloudinaryService,
         private readonly proRepo: ProductsRepository,) {}

    async createPicture(file: Express.Multer.File, product: ProductsEntity) {
        const upload = await this.cloudinaryService.uploadImageToCloudinary(file);
        
        const url = upload.url as string;
        
        product.Banner = url;
        await this.proRepo.save(product);   
        return await this.pictureRepo.save({ url: url, productId: product });
    }

    getPicture(productId: string) {
        return this.pictureRepo.findAll({
            where: {
                productId: {
                    id: productId,
                },
            },
        });
    }
}
