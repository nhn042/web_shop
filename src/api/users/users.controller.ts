import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Role } from 'src/share/common/role';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/guards/roles.auth';
import { RolesGuard } from '../auth/guards/roles.guards';
import { changePassword } from './dto/changePassword-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { forgetPassword } from './dto/forgetPassword-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (
        private readonly userService: UsersService,
    ) {}

    @Get('admin')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    findAllUser(): Promise<UserEntity[]>{
        return this.userService.findAllUser();
    }

    @Get('id/:id')
    @UseGuards(RolesGuard)
    findUserById(@Param('id') id: string): Promise<UserEntity> {
        return this.userService.findUserById(id);
    }
 
    @Post('active')
    @UseGuards(RolesGuard)
    activeUser(@Body() req: any): Promise<UserEntity> {
    return this.userService.activeUser(req);
    }

    @Post('change-pass')
    @UseGuards(RolesGuard)
    changePassword(@Body() dto: changePassword) {
    return this.userService.changePassword(dto);
    }

    @Post('forget-pass')
    @UseGuards(RolesGuard)
    forgetPassword(@Body() dto: forgetPassword) {
    return this.userService.forgetPassword(dto);
    }

    @Post('role/:id')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    roleUser(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.roleUser(id);
    }

    @Post('create')
    @UseGuards(RolesGuard)
    createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.CreateUser(createUserDto);
    }

    @Put('update')
    @UseGuards(RolesGuard)
    updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto): Promise<UserEntity> {
        return this.userService.updateUserById(id, updateUser);
    }

    @Delete('delete/:id')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

}
