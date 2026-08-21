import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import type { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ParsePositiveIntPipe } from '../common/pipes/parse-positive-int.pipe';
import { AuthGuard } from '../guards/auth/auth.guard';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Roles } from '../guards/roles/roles.decorator';
import { Role } from '../guards/roles/role.enum';

// will get applied all routes on putting here
// @UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}


  @Get() // GET /task     //willl get  applied on specfic route guard
  @UseGuards(AuthGuard)
  findAll(): Task[] {
    return this.taskService.findAll();
  }

  // @Get(':id') // GET /task/1
  // findOne(@Param('id', ParsePositiveIntPipe) id: number): Task {
  //   return this.taskService.findOne(id);
  // }
 @Get(':id') // GET /task/1
  findOne(@Param('id', ParseIntPipe) id: number): Task {
    return this.taskService.findOne(id);
  }
  @Post() // POST /task  body: { title, description? }
  create(@Body() dto: CreateTaskDto): Task {
    return this.taskService.create(dto);
  }

  //instead of parseint pipe we can use our own custom pipe to validate the id is positive integer or not

  @Put(':id') // PUT /task/1  body: { title?, description?, done? }
  update(@Param('id', ParsePositiveIntPipe) id: number, @Body() dto: UpdateTaskDto): Task {
    return this.taskService.update(id, dto);
  }

   @Delete(':id') // DELETE /task/1
  @Roles(Role.Admin) // only admin can delete a task
  @UseGuards(RolesGuard) // AuthGuard already ran at controller level, sets req.user
  remove(@Param('id', ParsePositiveIntPipe) id: number): Task {
    return this.taskService.remove(id);
  }
}
