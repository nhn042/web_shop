import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiForbiddenResponse, ApiFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from 'src/share/common/role';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/guards/roles.auth';
import { RolesGuard } from '../auth/guards/roles.guards';
import { activeUser } from './dto/active-user.dto';
import { changePassword } from './dto/changePassword-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { forgetPassword } from './dto/forgetPassword-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor (
        private readonly userService: UsersService,
    ) {}

    @Get('admin')
    @ApiAcceptedResponse({ description: 'user is admin'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiUnauthorizedResponse({ description: 'Not admin'})
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    findAllUser(): Promise<UserEntity[]>{
        return this.userService.findAllUser();
    }

    @Get('id/:id')
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiUnauthorizedResponse({ description: 'Not admin'})
    @UseGuards(RolesGuard)
    findUserById(@Param('id') id: string): Promise<UserEntity> {
        return this.userService.findUserById(id);
    }
 
    @Post('active')
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @UseGuards(RolesGuard)
    activeUser(@Body() dto: activeUser): Promise<UserEntity> {
    return this.userService.activeUser(dto);
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
