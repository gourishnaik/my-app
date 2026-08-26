import { NestFactory } from '@nestjs/core';// nestjs/core is the main entry point for creating a Nest application. It provides the NestFactory class, which is used to create an instance of the application.
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);// creates an instance of the Nest application using the AppModule as the root module. The create method returns a promise that resolves to the application instance.

  const config = app.get(ConfigService); // pull ConfigService out of the app's DI container (bootstrap() isn't a Nest class, so no constructor injection here)
  const port = config.get<number>('PORT') ?? 3000; // reads PORT from the .env file loaded by ConfigModule.forRoot() in app.module.ts

  // app.useGlobalPipes(new ValidationPipe()); // runs class-validator rules on every DTO
  app.useGlobalPipes(
  new ValidationPipe({//
    whitelist: true,// strip out any extra fields sent by the client
    forbidNonWhitelisted: true,// throw error if extra fields are sent
  }),//
);
  app.enableShutdownHooks(); // without this, onApplicationShutdown/onModuleDestroy never fire on Ctrl+C
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}


void bootstrap();
