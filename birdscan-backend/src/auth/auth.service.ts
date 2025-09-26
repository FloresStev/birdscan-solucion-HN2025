import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login_user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadEntity } from './payload';
import { Role, User } from '@prisma/client';

import { RedisService } from '../redis/redis.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtservice: JwtService, private redisService: RedisService) { }

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


    async login(user: any) {
        const payload: PayloadEntity = {
            sub: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName ?? user.given_name ?? 'Usuario',
            lastName: user.lastName ?? user.family_name ?? '',
            userName: user.userName ?? user.email.split('@')[0],
            picture: user.picture ?? null,
        };

        return {
            access_token: this.jwtservice.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: payload.firstName,
                lastName: payload.lastName,
                userName: payload.userName,
                picture: payload.picture,
            },
        };
    }

    async logout(token: string) {
        const ttl = 3600 * 24;
        await this.redisService.blacklistToken(token, ttl);
    }



}
