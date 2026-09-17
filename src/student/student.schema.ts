import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document; // Document adds Mongoose's _id, save(), etc. on top of your own fields

@Schema({ timestamps: true }) // marks this class as a Mongoose schema definition, read by SchemaFactory below

export class Student {
  @Prop({ required: true }) // required: true -> Mongoose rejects an insert/save that's missing this field
  name!: string; // `!` tells TS this is assigned by Mongoose at runtime, not in a constructor here

  @Prop({ required: true })
  age!: number;

  @Prop({ required: true, unique: true }) // unique: true -> Mongoose builds a unique index on this field
  email!: string;

  @Prop()
  course!: string; // optional field, no `required`
}

export const StudentSchema = SchemaFactory.createForClass(Student); // turns the decorated class above into an actual Mongoose Schema object, used by MongooseModule.forFeature()
