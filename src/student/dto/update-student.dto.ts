import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';

// PartialType(CreateStudentDto) makes name/age/email/course all OPTIONAL for updates,
// while still keeping the @IsString()/@IsEmail()/etc rules if they ARE sent.
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
