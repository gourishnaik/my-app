import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('students') // table name in Postgres — TypeORM's version of a Mongoose @Schema
export class Student {
  @PrimaryGeneratedColumn() // SERIAL primary key — Postgres needs an explicit PK column, unlike Mongo's auto _id
  id!: number;

  @Column()
  name!: string;

  @Column()
  age!: number;

  @Column({ unique: true }) // real UNIQUE constraint enforced by Postgres itself
  email!: string;

  @Column({ nullable: true }) // nullable -> optional column, like course?: string in the DTO
  course?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
