import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login_user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadEntity } from './payload';
import { Role, User } from '@prisma/client';

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

    async validateGoogleUser(googleUser: {
        email: string;
        firstName: string;
        lastName: string;
    }): Promise<User> {
        // Intentamos buscar el usuario por email
        let user = await this.usersService.findOne(googleUser.email);

        if (!user) {
            // Si no existe, lo creamos
            user = await this.usersService.createGoogleUser({
                userName: googleUser.email.split('@')[0],
                email: googleUser.email,
                firstName: googleUser.firstName,
                lastName: googleUser.lastName,
                role: 'USER',
            });
        }

        return user;
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
