import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtModule } from './jwt.module';
import { ConfigModule } from '@nestjs/config';
import {PrismaService} from "../prisma.service";
import {JwtAuthGuard} from "../conception/JwtAuthGuard";

@Module({
  imports: [
    AuthJwtModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}