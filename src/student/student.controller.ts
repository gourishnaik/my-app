import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('createstudent') // POST /student/createstudent  body: { name, age, email, course? }
  create(@Body() dto: CreateStudentDto) {
    return this.studentService.create(dto);
  }

  @Get('getallstudents') // GET /student/getallstudents
  findAll() {
    return this.studentService.findAll();
  }

  @Get('getstudent/:id') // GET /student/getstudent/<mongo _id>
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Put('updatestudent/:id') // PUT /student/updatestudent/<mongo _id>  body: { name?, age?, email?, course? }
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentService.update(id, dto);
  }

  @Patch('updatestudent/:id') // PATCH /student/updatestudent/<mongo _id>  body: { name?, age?, email?, course? } — same handler, more semantically correct verb for a partial update
  patch(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentService.update(id, dto);
  }
}
