import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';


@ObjectType()
@Entity()
export class Practices {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  practiceId: number;

  @Field()
  @Column()
  name: string; 
}

