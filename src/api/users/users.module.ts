import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/configs/database/database.module';
import { SendMailModule } from 'src/utils/sendMail/mail.module';
import { UsersController } from './users.controller';
import { UserEntity } from './users.entity';
import { UsersProviders } from './users.provider';
import { UserRepository } from './users.respository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), DatabaseModule , SendMailModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, ... UsersProviders]
})
export class UsersModule {}
