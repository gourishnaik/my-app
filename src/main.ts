import { NestFactory } from '@nestjs/core';// nestjs/core is the main entry point for creating a Nest application. It provides the NestFactory class, which is used to create an instance of the application.
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);// creates an instance of the Nest application using the AppModule as the root module. The create method returns a promise that resolves to the application instance.


  // app.useGlobalPipes(new ValidationPipe()); // runs class-validator rules on every DTO
  app.useGlobalPipes(
  new ValidationPipe({//
    whitelist: true,// strip out any extra fields sent by the client
    forbidNonWhitelisted: true,// throw error if extra fields are sent
  }),//
);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
}
void bootstrap();
