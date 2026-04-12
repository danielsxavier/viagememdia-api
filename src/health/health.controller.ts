import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface HealthResponse {
  status: 'ok';
  service: string;
  version: string;
  timestamp: string;
}

@Controller('health')
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: this.configService.get<string>('serviceName', 'viagememdia-api'),
      version: this.configService.get<string>('version', '0.0.1'),
      timestamp: new Date().toISOString(),
    };
  }
}
