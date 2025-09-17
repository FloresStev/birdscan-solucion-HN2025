import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login_user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadEntity } from './payload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtservice: JwtService) { }

    async validateUser(body: LoginUserDto) {
        try {
            const userEmail = await this.usersService.findOne(body.email);

            if (!userEmail) {
                throw new UnauthorizedException('Usuario no encontrado');
            }
            const matchResult = await bcrypt.compare(body.password, userEmail?.password ?? "");
            if (userEmail && matchResult) {
                const { password, ...result } = userEmail;
                return result;
            }
            return null;
        } catch (error) {
            if (error instanceof Error) throw new InternalServerErrorException(error.message);
        }
    }

    async login(user: User) {
        const payload: PayloadEntity = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const { password, ...safeUser } = user;

        return {
            access_token: this.jwtservice.sign(payload),
            user: safeUser,
        };
    }
}
