import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // pulls the Repository registered via TypeOrmModule.forFeature() out of DI
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from '../student/dto/create-student.dto'; // same DTOs as the Mongo version — class-validator doesn't care which DB it feeds
import { UpdateStudentDto } from '../student/dto/update-student.dto';

@Injectable()
export class StudentPgService {
  constructor(@InjectRepository(Student) private studentRepo: Repository<Student>) {}

  async create(dto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepo.create(dto); // builds an entity instance in memory, not saved yet
    return this.studentRepo.save(student); // INSERT ... RETURNING *
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepo.find(); // SELECT * FROM students
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepo.findOneBy({ id }); // SELECT * FROM students WHERE id = $1
    if (!student) {
      throw new NotFoundException(`Student ${id} not found`);
    }
    return student;
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.studentRepo.preload({ id, ...dto }); // loads the row and merges dto's fields on top — like findByIdAndUpdate's merge
    if (!student) {
      throw new NotFoundException(`Student ${id} not found`);
    }
    return this.studentRepo.save(student); // UPDATE ... WHERE id = $1
  }

  async remove(id: number): Promise<Student> {
    const student = await this.findOne(id); // reuse — also gives us the row to return after deleting it
    await this.studentRepo.delete(id); // DELETE FROM students WHERE id = $1
    return student;
  }
}
