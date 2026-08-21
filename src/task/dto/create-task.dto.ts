import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {

  @IsNotEmpty()    // title is required and cannot be empty
  @IsString()      // title must be a string
  title!: string;  // ! tells TypeScript it will be assigned later


  @IsOptional()           // description is not required
  @IsString()             // if provided, description must be a string
  description?: string;  // ? means this property is optional


  @IsOptional()        // done is not required
  @IsBoolean()         // if provided, done must be true or false
  done?: boolean;      // ? means this property is optional
}