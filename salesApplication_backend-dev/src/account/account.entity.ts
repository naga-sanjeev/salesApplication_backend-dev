import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Account {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  accountId: number;

  @Field()
  @Column()
  accountType: string;
}
