import { NestFactory } from '@nestjs/core';
import { DeviceModule } from './device/device.module';

async function bootstrap() {
  const app = await NestFactory.create(DeviceModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
