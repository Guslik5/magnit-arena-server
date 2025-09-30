import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import {PrismaService} from "../prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    async validateAdmin(adminId: number) {
        const admin = await this.prisma.admin.findUnique({
            where: {
                id: adminId,
            },
        });

        if (!admin) {
            return null; // Or throw NotFoundException
        }

        return admin;
    }

    async login(authDto: AuthDto): Promise<{ access_token: string }> {
        const { username, password } = authDto;

        const admin = await this.prisma.admin.findUnique({
            where: {
                username,
            },
        });

        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: admin.id, username: admin.username };
        const access_token = await this.jwtService.signAsync(payload);

        return { access_token };
    }
}