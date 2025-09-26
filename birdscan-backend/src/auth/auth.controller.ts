import { Body, Controller, Get, Post, Request, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateGoogleUserDto } from 'src/users/dto/create-google-user.dt';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }

    @Post('register')
    async register(@Body() body: CreateUserDto) {

        const newUser = await this.usersService.createUser(body);
        const result = await this.authService.login(newUser);
        return {
            message: 'Usuario registrado con éxito',
            user: newUser,
            acces_token: result.access_token
        };
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {

    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {

        let user = await this.usersService.findByEmail(req.user.email);


        if (!user) {
            const createUserDto: CreateGoogleUserDto = {
                email: req.user.email,
                firstName: req.user.firstName || req.user.given_name || "Usuario",
                lastName: req.user.lastName || req.user.family_name || "",
                userName: req.user.userName || req.user.email.split("@")[0],
                role: "USER",
                cellphone_number: ""
            };
            user = await this.usersService.createGoogleUser(createUserDto);
        }

        const jwt = await this.authService.login(user);

        return res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${jwt.access_token}`);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    Login(@Request() req) {
        return this.authService.login(req.user)
    }

    @Post('logout')
    async Logout(@Req() req, @Res() res) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader?.split(' ')[1];

            if (!token) {
                return res.status(400).json({ message: 'Token no proporcionado' });
            }

            await this.authService.logout(token);
            return res.status(200).json({ message: 'Logout exitoso, token invalidado' });
        } catch (error) {
            console.error("Error en logout:", error);
            return res.status(500).json({ message: 'Error interno al cerrar sesión' });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req) {
        const user = await this.usersService.getUserById(req.user.userId);
        return { user };
    }



}
