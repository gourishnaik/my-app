import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Task } from './interfaces/task.interface';

@Injectable()
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Learn NestJS DTOs', done: false },
    { id: 2, title: 'Build task module', done: false },
  ];

  private nextId = 3;// Initialize nextId to 3 since we already have two tasks with IDs 1 and 2

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  create(dto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.nextId++,
      title: dto.title, // @IsNotEmpty() on the DTO guarantees this at runtime
      description: dto.description,
      done: dto.done ?? false, // client may omit 'done' on create; default to not-done
    };

    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, dto: UpdateTaskDto): Task {
    const task = this.findOne(id);

    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.done !== undefined) task.done = dto.done;

    return task;
  }

  remove(id: number): Task {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return this.tasks.splice(index, 1)[0];
  }
}
