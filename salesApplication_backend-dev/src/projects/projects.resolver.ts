import {
  Resolver,
  Query,
  Mutation,
  Args,
  InputType,
  Field,
} from "@nestjs/graphql";
import { Projects, ProjectsHistory } from "./projects.entity";
import { ProjectsService } from "./projects.service";
import { Int } from "@nestjs/graphql";

@InputType()
class ProjectsInput {
  @Field()
  clientName: string;

  @Field()
  industryType: string;

  @Field()
  practiceName: string;

  @Field()
  submittedBy: string;

  @Field()
  role: string;

  @Field()
  reportsTo: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  createdAt: string;

  @Field({ nullable: true })
  requirement?: string;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  conversation?: string;

  @Field({ nullable: true })
  pointOfContact?: string;

  @Field({ nullable: true })
  projectName?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  technology?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  architecture: string;

  @Field({ nullable: true })
  accountType: string;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;
}

@Resolver((of) => [Projects, ProjectsHistory])
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  //  Method to fetch all Project details
  @Query((returns) => [Projects])
  async getProjects(): Promise<Projects[]> {
    return this.projectsService.findAll();
  }

  // Method to create a new Project
  @Mutation((returns) => Projects)
  async createProject(@Args("input") input: ProjectsInput): Promise<Projects> {
    return this.projectsService.create(input);
  }

  //  Method to update a Project details by Project Id
  @Mutation((returns) => Projects)
  async editMyActivity(
    @Args("projectId") projectId: number,
    @Args("input") input: ProjectsInput
  ): Promise<Projects | null> {
    return this.projectsService.edit(projectId, input);
  }

  //  Method to fetch all Project details by user role
  @Query((returns) => [Projects])
  async getProjectsTableData(@Args("role") role: string): Promise<Projects[]> {
    return this.projectsService.findByUserRole(role);
  }

  //  Method to fetch all Project details by username
  @Query((returns) => [Projects])
  async getMyActivitiesOfUser(
    @Args("username") username: string
  ): Promise<Projects[]> {
    return this.projectsService.findByUsername(username);
  }

  //  Method to fetch all Project details by reportsTo
  @Query((returns) => [Projects])
  async getMyTeamActivities(
    @Args("reportsTo") reportsTo: string
  ): Promise<Projects[]> {
    return this.projectsService.findByreportsTo(reportsTo);
  }

  //  Method to Delete a Project details by Project Id
  @Mutation((returns) => Boolean)
  async deleteProject(
    @Args("projectId", { type: () => Int }) projectId: number
  ): Promise<boolean> {
    try {
      const result = await this.projectsService.delete(projectId);
      return result;
    } catch (error) {
      throw new Error("Error deleting project: "+ error);
    }
  }

  //  Method to fetch all Project History details by Project Id
  @Query((returns) => [ProjectsHistory])
  async getProjectsHistoryByProjectId(
    @Args("project_Id") project_Id: number
  ): Promise<ProjectsHistory[]> {
    return this.projectsService.getProjectsHistoryByProjectId(project_Id);
  }
}
