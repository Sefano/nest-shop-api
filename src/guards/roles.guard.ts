import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const result = request.currentUser?.roles
      .map((role: string) => allowedRoles.includes(role))
      .find((val: boolean) => val === true);
    if (result) {
      return true;
    } else {
      throw new UnauthorizedException('You are not authorized');
    }
  }
}
