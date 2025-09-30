import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import {Get, Request, UseGuards, UnauthorizedException,} from '@nestjs/common';
import {JwtAuthGuard} from "../conception/JwtAuthGuard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(JwtAuthGuard) // Используем guard для защиты эндпоинта
    @Get('me')
    async getProfile(@Request() req) {
        if (!req.user) {
            throw new UnauthorizedException();
        }

        // Здесь можно достать полную информацию о пользователе из базы данных
        // на основе req.user.sub (admin.id)
        const admin = await this.authService.validateAdmin(req.user.sub);

        if (!admin) {
            throw new UnauthorizedException('Admin not found');
        }

        // Возвращаем информацию о пользователе (не пароль!)
        return {
            id: admin.id,
            username: admin.username,
            // ... другие поля, которые вы хотите вернуть
        };
    }


    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() authDto: AuthDto): Promise<{ access_token: string }> {
        return this.authService.login(authDto);
    }
}