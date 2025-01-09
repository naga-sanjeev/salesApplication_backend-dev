import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Status {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  statusId: number;

  @Field()
  @Column()
  status: string;
}
