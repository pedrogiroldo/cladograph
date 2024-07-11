import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import extractTokenFromHeader from '../utils/extractTokenFromHeader.util';
import { JwtService } from '@nestjs/jwt';

export interface RequestWithUserId extends Request {
  userId: string;
}

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithUserId = context.switchToHttp().getRequest();

    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Invalid token!');
    }

    try {
      const payload = this.jwtService.verify(token, {
        // The Jwt service inside guards can't access the
        // secret defined in the app module, so we have to put it
        // here too
        secret: process.env.JWT_SECRET,
      });
      request.userId = payload.userId;
    } catch (error) {
      throw new UnauthorizedException('Invalid token!');
    }

    return true;
  }
}
