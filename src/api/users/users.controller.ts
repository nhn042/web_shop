import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (
        private readonly userService: UsersService,
    ) {}
    @Get('')
    findAllUser(): Promise<UserEntity[]>{
        return this.userService.findAllUser();
    }

    @Get('id/:id')
    findUserById(@Param('id') id: string): Promise<UserEntity> {
        return this.userService.findUserById(id);
   }

    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.CreateUser(createUserDto);
    }

    @Put('update')
    updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto): Promise<UserEntity> {
        return this.userService.updateUserById(id, updateUser);
    }

    @Delete('delete/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

}
