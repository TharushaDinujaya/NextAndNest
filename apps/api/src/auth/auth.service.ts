import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';
import { use } from 'passport';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}
    registerUser(createUserDto: CreateUserDto) {
        const user = this.userService.findByEmail(createUserDto.email);
        if(user) throw new ConflictException('User already exists')
            return this.userService.create(createUserDto);
    }

    async validateLocalUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if(!user) throw new UnauthorizedException("User not found !");
        const isPasswordMatched = verify(user.password, password);
        if(!isPasswordMatched) throw new UnauthorizedException("Invalid password");

        return {id: user.id, name: user.name};
    }
}