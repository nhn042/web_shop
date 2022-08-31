import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/configs/database/database.module';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './category.entity';
import { categoryProviders } from './category.provide';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  imports:[DatabaseModule, JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, ...categoryProviders,],
  exports: [CategoryService, CategoryRepository]
})
export class CategoryModule {}
