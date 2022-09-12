import { PictureRepository } from './picture.repository';
import { Picture } from './pictures.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { DatabaseModule } from 'src/configs/database/database.module';
import { picturesProviders } from './pictures.provider';
import { ProductsModule } from '../products/products.module';
import { ProductsRepository } from '../products/products.repository';

@Module({
    imports: [DatabaseModule, CloudinaryModule, forwardRef(() => ProductsModule)],
    providers: [PicturesService, PictureRepository, ...picturesProviders],
    exports: [PicturesService, PictureRepository],
})
export class PicturesModule {}
