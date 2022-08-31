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

@Injectable()
export class UsersService {
    constructor(private readonly userRepo: UserRepository , private readonly mailService: SendMailService){}
    
    async findAllUser(): Promise<UserEntity[]> {
        return await this.userRepo.find();
    }

    async findUserById(id: string): Promise<UserEntity>{
        return await this.userRepo.findOneByCondition({where: {id: id}});
    }
    async activeUser(req: any): Promise<UserEntity> {
        const user = await this.userRepo.findOneByCondition({where: {email: req.email}})
        const otp = (await user).activeCode
        if(req.otp = otp) {
            user.isActive = true;
            await user.save();
            return user;
        }
    }

    async CreateUser(CreateUserDto: CreateUserDto): Promise<UserEntity> {
        const userEmail = CreateUserDto.email;
        const userFound = await this.userRepo.findOneByCondition({where: {email: userEmail}});
        
        if(userFound) {
            throw new NotFoundException(ERROR.USER_FOUND);
        }
        
        const hashPassword = await encodePassword(CreateUserDto.password);
        CreateUserDto.activeCode = await this.mailService.sendMail(CreateUserDto.email);
        console.log(CreateUserDto.activeCode);
        
        const newUser = await this.userRepo.save({...CreateUserDto, password: hashPassword});
        
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