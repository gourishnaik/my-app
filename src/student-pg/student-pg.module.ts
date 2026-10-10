import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentPgService } from './student-pg.service';
import { StudentPgController } from './student-pg.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student])], // registers Repository<Student> in DI — mirrors MongooseModule.forFeature()
  providers: [StudentPgService],
  controllers: [StudentPgController],
})
export class StudentPgModule {}
