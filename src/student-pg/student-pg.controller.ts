import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { StudentPgService } from './student-pg.service';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { UpdateStudentDto } from '../student/dto/update-student.dto';

@Controller('student-pg') // same routes as student.controller.ts, but backed by Postgres
export class StudentPgController {
  constructor(private readonly studentPgService: StudentPgService) {}

  @Post('createstudent') // POST /student-pg/createstudent  body: { name, age, email, course? }
  create(@Body() dto: CreateStudentDto) {
    return this.studentPgService.create(dto);
  }

  @Get('getallstudents') // GET /student-pg/getallstudents
  findAll() {
    return this.studentPgService.findAll();
  }

  @Get('getstudent/:id') // GET /student-pg/getstudent/<numeric id>
  findOne(@Param('id', ParseIntPipe) id: number) { // ParseIntPipe: Postgres ids are numbers, not Mongo ObjectId strings
    return this.studentPgService.findOne(id);
  }

  @Put('updatestudent/:id') // PUT /student-pg/updatestudent/<numeric id>
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStudentDto) {
    return this.studentPgService.update(id, dto);
  }

  @Patch('updatestudent/:id') // PATCH — same handler, more semantically correct verb for a partial update
  patch(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStudentDto) {
    return this.studentPgService.update(id, dto);
  }

  @Delete('deletestudent/:id') // DELETE /student-pg/deletestudent/<numeric id>
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentPgService.remove(id);
  }
}
