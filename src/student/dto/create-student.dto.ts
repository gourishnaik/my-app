import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {

  @IsNotEmpty()   // name is required and cannot be empty
  @IsString()     // name must be a string
  name!: string;  // ! tells TypeScript it will be assigned later

  @IsNotEmpty()   // age is required
  @IsInt()        // age must be a whole number
  age!: number;

  @IsNotEmpty()   // email is required
  @IsEmail()      // email must be a valid email format
  email!: string;

  @IsOptional()       // course is not required
  @IsString()         // if provided, course must be a string
  course?: string;    // ? means this property is optional
}
