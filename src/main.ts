import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';

async function bootstrap(): Promise<void> {
  // Initialising dataset
  initialiseDataset();

  // Instanciates the root application NEST module
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({enableDebugMessages: true}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// Resets the application dataset for testing purposes
async function initialiseDataset(): Promise<void> {
  // To Fill - Might Move in AppModule?
}
