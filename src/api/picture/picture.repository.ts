import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeOrmRepository } from 'src/share/database/typeorm.repository';
import { Picture } from './pictures.entity';
import { PICTURES_CONST } from './pictures.constant';

@Injectable()
export class PictureRepository extends TypeOrmRepository<Picture> {
  constructor(
    @Inject(PICTURES_CONST.MODEL_PROVIDER)
    picturesEntity: Repository<Picture>,
  ) {
    super(picturesEntity);
  }
}