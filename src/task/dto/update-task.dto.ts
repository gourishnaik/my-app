import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

// PartialType(CreateTaskDto) makes title/description OPTIONAL for updates,
// while still keeping the @IsString()/@IsNotEmpty() rules if they ARE sent.
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
