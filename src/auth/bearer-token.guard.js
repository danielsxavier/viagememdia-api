const { Injectable } = require('@nestjs/common');
const { ConfigService } = require('@nestjs/config');
const { Reflector } = require('@nestjs/core');
const { IS_PUBLIC_KEY } = require('./public.decorator');

class BearerTokenGuard {
  constructor(configService, reflector) {
    this.configService = configService;
    this.reflector = reflector;
  }

  canActivate(context) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const authHeader = request.headers.authorization;
    const configuredToken = this.configService.get('apiToken', '');

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

Injectable()(BearerTokenGuard);
Reflect.defineMetadata('design:paramtypes', [ConfigService, Reflector], BearerTokenGuard);

module.exports = { BearerTokenGuard };
