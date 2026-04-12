export default () => ({
  port: Number(process.env.PORT ?? 3000),
  apiToken: process.env.API_TOKEN ?? '',
  serviceName: 'viagememdia-api',
  version: '0.0.1',
});
