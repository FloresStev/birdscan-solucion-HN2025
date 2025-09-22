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
            const firstName = name?.givenName ?? '';
            const lastName = name?.familyName ?? '';

            let existingUser = await this.usersService.findOne(email);

            if (!existingUser) {
                existingUser = await this.usersService.createGoogleUser({
                    userName: email.split('@')[0],
                    firstName,
                    lastName,
                    email,
                    role: Role.USER,
                });
            }

            done(null, existingUser);
        } catch (error) {
            done(error, false);
        }
    }
}

