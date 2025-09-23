import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from '../../users/users.service';
import { Role } from '@prisma/client';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private usersService: UsersService) {
        const callbackUrl = `${process.env.BACKEND_URL}/api/auth/google/callback`;
        super({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: callbackUrl,
            scope: ['email', 'profile'],
            passReqToCallback: true,
        });
    }

    authorizationParams(): Record<string, string> {
        return {
            prompt: 'select_account',
        };
    }

    async validate(
        req: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        try {
            const { name, emails } = profile;
            const email = emails?.[0]?.value;

            let user = await this.usersService.findByEmail(email);

            if (!user) {
                user = await this.usersService.createGoogleUser({
                    userName: email.split('@')[0],
                    firstName: name?.givenName ?? 'Usuario',
                    lastName: name?.familyName ?? '',
                    email,
                    role: Role.USER,
                });
            }

            // Devuelve el usuario completo de la DB
            done(null, user);
        } catch (err) {
            console.error("Error en validate:", err);
            done(err, false);
        }
    }




}

