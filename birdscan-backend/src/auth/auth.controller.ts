import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }
    @Post('/register')
    async register(@Body() body: CreateUserDto) {
        return this.usersService.createUser(body)
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    Login(@Request() req) {
        return this.authService.login(req.user)
    }

    @Post('/logout')
    LogOut(@Request() req){
        
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async getProfile(@Request() req){
        return await this.usersService.getUserById(req.user.userId);
    }
}
