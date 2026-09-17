import { Injectable, NotFoundException } from '@nestjs/common'; // marks this class as a provider Nest can inject elsewhere
import { InjectModel } from '@nestjs/mongoose'; // pulls a model registered via MongooseModule.forFeature() out of DI, by name
import { Model } from 'mongoose'; // generic Mongoose model type, parameterized with our document type below
import { Student, StudentDocument } from './student.schema'; // Student.name gives the registration key, StudentDocument gives the shape
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { // studentModel now has find/create/etc. typed against Student's fields
    }
//StudentDocument is a type that combines the Student class with Mongoose's Document interface, which includes properties like _id and methods like save(). This allows us to work with Student documents in a type-safe way, ensuring that we have access to both the fields defined in the Student class and the additional functionality provided by Mongoose's Document interface.
    async create(dto: CreateStudentDto): Promise<StudentDocument> { // Promise because .save() hits the DB over the network — result isn't ready synchronously
        const newStudent = new this.studentModel(dto); // builds a document in memory, validated against the schema
        return newStudent.save(); // persists it to MongoDB and returns the saved document (with _id, timestamps)
    }

    async findAll(): Promise<StudentDocument[]> { // Promise because .find().exec() is a DB query, not an in-memory array read like task.service.ts
        return this.studentModel.find().exec(); // fetches every student document from the collection
    }

// same bt has await so we can check for existence and throw a NotFoundException if the student isn't found
    //    async findAll(): Promise<StudentDocument[]> { // Promise because .find().exec() is a DB query, not an in-memory array read like task.service.ts
    //     const students = await this.studentModel.find().exec(); // await needed now — we inspect the result below before returning
    //     if (students.length === 0) {
    //         throw new NotFoundException('No students found');
    //     }
    //     return students;
    // }
    async findOne(id: string): Promise<StudentDocument> { // Promise because findById() also has to round-trip to the DB before we know if the doc exists
        const student = await this.studentModel.findById(id).exec(); // Mongo _id lookup, not the array-index style task.service.ts uses
        if (!student) {
            throw new NotFoundException(`Student ${id} not found`); // caught by whichever exception filter is active (global default here)
        }
        return student;
    }

    async update(id: string, dto: UpdateStudentDto): Promise<StudentDocument> { // Promise — findByIdAndUpdate is also a DB round-trip
        const updatedStudent = await this.studentModel.findByIdAndUpdate(id, dto, { new: true }) // <-- ACTUAL WRITE happens here: Mongo finds the doc by _id and applies dto's fields to it, in one atomic DB operation
            .exec(); // just fires the query and returns a real Promise (theory/32) — no write logic here, .exec() only runs what .findByIdAndUpdate() already built
        if (!updatedStudent) {
            throw new NotFoundException(`Student ${id} not found`); // no document matched that _id, nothing was updated
        }
        return updatedStudent;
    }

    

    
}

