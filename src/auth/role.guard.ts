import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

interface RequestWithUser {
  user?: {
    role: string;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const user = req.user;
    if (!user) {
      return false;
    }

    const hasRoles = roles.some((role) => role === user?.role);
    return hasRoles;
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
