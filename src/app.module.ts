import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { LoggeerMiddleware } from './middleware/loggeer/loggeer.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // reads .env once at boot; isGlobal lets any module inject ConfigService without re-importing
    EmployeeModule,
    CategoryModule,
    UserModule,
    TaskModule,
    MongooseModule.forRootAsync({ // async form — lets us build the options object from an injected provider instead of a static value
      inject: [ConfigService], // ConfigService instance is resolved via DI and handed to useFactory below
      useFactory: (configService: ConfigService) => ({ // Nest calls this once at boot with the injected service, and forRoot()s the returned object
        uri: configService.getOrThrow<string>('MONGODB_URI'), // typed string, not string|undefined; throws at boot if the env var is missing instead of connecting to undefined
      }),
    }),
    StudentModule
  ],
  controllers: [AppController, DatabaseController],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggeerMiddleware).forRoutes('*'); // runs before guards/pipes, on every route
  }
}
