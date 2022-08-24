import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Role } from 'src/share/common/role';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/guards/roles.auth';
import { RolesGuard } from '../auth/guards/roles.guards';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (
        private readonly userService: UsersService,
    ) {}
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    @Get('')
    findAllUser(): Promise<UserEntity[]>{
        return this.userService.findAllUser()
    }

    @Get('id/:id')
    findUserById(@Param('id') id: string): Promise<UserEntity> {
        return this.userService.findUserById(id);
   }

   @Post('active')
   activeUser(@Body() req: any): Promise<UserEntity> {
    return this.userService.activeUser(req);
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
