import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const authHeader = request.headers.authorization;
    const configuredToken = this.configService.get<string>('apiToken', '');

    if (!configuredToken || !authHeader) {
      response.status(401).json({ message: 'Unauthorized' });
      return false;
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || token !== configuredToken) {
      response.status(401).json({ message: 'Unauthorized' });
      return false;
    }

    return true;
  }
}
