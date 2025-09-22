
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SECRET } from 'constants/jwt-key';
import { PayloadEntity } from '../payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET,
        });
    }

    validate(payload: PayloadEntity) {
        return { 
            userId: payload.sub,
            email: payload.email,
            role: payload.role};
    }
}
