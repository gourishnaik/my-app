import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { LoggeerMiddleware } from './middleware/loggeer/loggeer.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // reads .env once at boot; isGlobal lets any module inject ConfigService without re-importing
    EmployeeModule,
    CategoryModule,
    UserModule,
    TaskModule,
  ],
  controllers: [AppController, DatabaseController],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggeerMiddleware).forRoutes('*'); // runs before guards/pipes, on every route
  }
}
