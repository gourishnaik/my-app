import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]), // registers the Student model on this module's DI container, keyed by name for @InjectModel(Student.name)
  ],
  exports: [MongooseModule], // re-exports it so any module that imports StudentModule can also @InjectModel(Student.name)
  providers: [StudentService], controllers: [StudentController],
})
export class StudentModule {}
