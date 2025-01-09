import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Attachments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  s3Url: string;
}
