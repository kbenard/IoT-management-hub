import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  // Initialising dataset
  initialiseDataset();

  // Instanciates the root application NEST module
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// Resets the application dataset for testing purposes
async function initialiseDataset(): Promise<void> {
  // To Fill - Might Move in AppModule?
}
