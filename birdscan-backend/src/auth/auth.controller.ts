import { Body, Controller, Get, Post, Request, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }
    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return this.usersService.createUser(body)
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {

    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
        const jwt = await this.authService.login(req.user);
        return res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${jwt.access_token}`);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    Login(@Request() req) {
        return this.authService.login(req.user)
    }

    @Post('logout')
    LogOut(@Request() req) {

    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return { user: req.user };
    }
}
