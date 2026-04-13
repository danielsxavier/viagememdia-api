const { Controller, Get } = require('@nestjs/common');
const { ConfigService } = require('@nestjs/config');

class HealthController {
  constructor(configService) {
    this.configService = configService;
  }

  getHealth() {
    return {
      status: 'ok',
      service: this.configService.get('serviceName', 'viagememdia-api'),
      version: this.configService.get('version', '0.0.1'),
      timestamp: new Date().toISOString(),
    };
  }
}

Controller('health')(HealthController);
Get()(HealthController.prototype, 'getHealth', Object.getOwnPropertyDescriptor(HealthController.prototype, 'getHealth'));
Reflect.defineMetadata('design:paramtypes', [ConfigService], HealthController);

module.exports = { HealthController };
