require('reflect-metadata');
const { NestFactory } = require('@nestjs/core');
const { ConfigService } = require('@nestjs/config');
const { AppModule } = require('./app.module');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port', 3000);

  await app.listen(port);
}

bootstrap();
