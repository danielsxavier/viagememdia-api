const { Module } = require('@nestjs/common');
const { ConfigModule } = require('@nestjs/config');
const { APP_GUARD } = require('@nestjs/core');
const { AuthModule } = require('./auth/auth.module');
const { BearerTokenGuard } = require('./auth/bearer-token.guard');
const { HealthModule } = require('./health/health.module');
const configuration = require('./config/configuration');

class AppModule {}

Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: BearerTokenGuard,
    },
  ],
})(AppModule);

module.exports = { AppModule };
