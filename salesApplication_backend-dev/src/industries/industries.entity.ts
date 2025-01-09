import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql'; 

@ObjectType() 
@Entity()
export class Industries {
  @Field(type => ID) 
  @PrimaryGeneratedColumn()
  industryId: number;

  @Field() 
  @Column()
  name: string;
}
