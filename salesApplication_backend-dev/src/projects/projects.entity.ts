import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Projects {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  projectId: number;

  // Common Fields
  @Field()
  @Column({ default: "" })
  clientName: string;

  @Field()
  @Column({ default: "" })
  industryType: string;

  @Field()
  @Column({ default: "" })
  practiceName: string;

  @Field()
  @Column({ default: "" })
  submittedBy: string;

  @Field()
  @Column({ default: "" })
  role: string;

  @Field()
  @Column({ default: "" })
  reportsTo: string;

  @Field()
  @Column({ default: "" })
  name: string;

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  // Fields for New Client Form
  @Field()
  @Column({ default: "" })
  requirement: string;

  @Field()
  @Column({ default: "" })
  date: string;

  @Field()
  @Column({ default: "" })
  conversation: string;

  @Field()
  @Column({ default: "" })
  pointOfContact: string;

  // Fields for Project Info Form
  @Field()
  @Column({ default: "" })
  projectName: string;

  @Field()
  @Column({ default: "" })
  accountType: string;

  @Field()
  @Column({ default: "" })
  status: string;

  @Field()
  @Column({ default: "" })
  technology: string;

  @Field()
  @Column({ default: "" })
  description: string;

  @Field()
  @Column({ default: "" })
  startDate: string;

  @Field()
  @Column({ default: "" })
  endDate: string;

  @Field()
  @Column({ default: "" })
  architecture: string;
}

@ObjectType()
@Entity()
export class ProjectsHistory {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  historyId: number;

  @Field()
  @Column()
  project_Id : number;

  @Field()
  @Column({ type: "text" })
  actions: string;

  @Field()
  @Column({ default: '' })
  submittedBy: string;

  @Field()
  @Column()
  createdAt: Date;
}
