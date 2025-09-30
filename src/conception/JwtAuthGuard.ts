import {Injectable, CanActivate, ExecutionContext, UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Invalid authorization header');
        }

        const token = authHeader.substring(7); // Remove "Bearer "

        try {
            const payload = await this.jwtService.verifyAsync(token);
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }

        return true;
    }
}
