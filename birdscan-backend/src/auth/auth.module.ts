import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from 'constants/jwt-key';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { RedisModule } from '../redis/redis.module';


@Module({
  imports: [PassportModule, JwtModule.register({
    secret: SECRET,
    signOptions: {expiresIn: '8hrs'},
  }), RedisModule,],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy, PrismaService, GoogleStrategy],
})
export class AuthModule {}
