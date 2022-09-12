import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.respository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './users.entity';
import { ERROR } from 'src/share/common/error';
import { encodePassword } from 'src/utils/bcrypt';
import { Login } from '../auth/dto/auth-dto.login';
import { SendMailService } from 'src/utils/sendMail/mail.service';
import { changePassword } from './dto/changePassword-user.dto';
import { forgetPassword } from './dto/forgetPassword-user.dto';
import { Role } from 'src/share/common/role';
import { activeUser } from './dto/active-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly userRepo: UserRepository , private readonly mailService: SendMailService){}
    
    async findAllUser(): Promise<UserEntity[]> {
        return await this.userRepo.find();
    }

    async findUserById(id: string): Promise<UserEntity> {
        return await this.userRepo.findOneByCondition({where: {id: id}});
    }

    async activeUser(dto: activeUser): Promise<UserEntity> {
        const user = await this.userRepo.findOneByCondition({where: {email: dto.email}})
        const otp = (await user).activeCode
        if(dto.otp = otp) {
            user.isActive = true;
            await user.save();
            return user;
        }
    }

    async changePassword(dto: changePassword) {
        const user = await this.userRepo.findOneByCondition({where: {id: dto.id}})
        if(!user) {
            throw new NotFoundException(ERROR.USER_NOT_FOUND);
        }
        if(user.password !== dto.Password) {
            throw new NotFoundException(ERROR.USERNAME_OR_PASSWORD_INCORRECT)
        }
        user.password = await encodePassword(dto.newPassword);
        await this.userRepo.save(user);
        return {message: 'sucessfull'};
    }

    async forgetPassword(dto: forgetPassword) {
        const user = await this.userRepo.findOneByCondition({where: {email: dto.email}})
        if(!user) {
            throw new NotFoundException(ERROR.USER_NOT_FOUND);
        }
        const otp = await this.mailService.sendMail(dto.email);
        if(dto.otp === otp) {
            user.password = dto.newPassword;
        }
        await this.userRepo.save(user);
        return {message: 'sucessfull'}
    }

    async roleUser(id: string): Promise<UserEntity> {
        const user = await this.userRepo.findOneByCondition({where: {id: id}})
        if(!user) {
            throw new NotFoundException(ERROR.USER_NOT_FOUND);
        }
        user.Role = Role.admin;
        return await this.userRepo.save(user);
    }

    async CreateUser(CreateUserDto: CreateUserDto): Promise<UserEntity> {
        const userEmail = CreateUserDto.email;
        const userFound = await this.userRepo.findOneByCondition({where: {email: userEmail}});
        
        if(userFound) {
            throw new NotFoundException(ERROR.USER_FOUND);
        }
        
        const hashPassword = await encodePassword(CreateUserDto.password);
        const activeCode = await this.mailService.sendMail(CreateUserDto.email);       
        const newUser = await this.userRepo.save({...CreateUserDto, password: hashPassword, activeCode: activeCode});

        return newUser;
    }

    async updateUserById(userID: string, UpdateUserDto: UpdateUserDto): Promise<UserEntity> {
        const userFound = await this.userRepo.findOneByCondition({where: {id: userID}});
        if(!userFound) {
            throw new NotFoundException(ERROR.USER_NOT_FOUND.MESSAGE);
        }
        const userUpdate = this.userRepo.update(userFound.id, UpdateUserDto);
        return userUpdate;
    }

    async deleteUser(id: string): Promise<UserEntity> {
        const userFound = await this.userRepo.findOneByCondition({where: {id: id}})
        if(!userFound) {
            throw new NotFoundException(ERROR.USER_NOT_FOUND)
        }
        return await this.userRepo.delete(id);
    }

    async validateUser(dto: Login): Promise<UserEntity> {
        const user = await this.userRepo.findOneByCondition({where: {email: dto.email}});
        const password = dto.password;
        if(user && user.password === password) {
            return user;
        } else {
            throw new NotFoundException(ERROR.USER_NOT_FOUND);
        }
    }
}