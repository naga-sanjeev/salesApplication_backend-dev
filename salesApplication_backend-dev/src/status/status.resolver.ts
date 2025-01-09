// practices.resolver.ts
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Status } from "./status.entity";
import { StatusService } from "./status.service";

@Resolver((of) => Status)
export class StatusResolver {
  constructor(private readonly StatusService: StatusService) {}

  //  Query to fetch Project status like active/inactive
  @Query((returns) => [Status])
  async getStatus(): Promise<Status[]> {
    return this.StatusService.getStatus();
  }

  // Mutation to create a new Project status
  @Mutation((returns) => Status)
  async createStatus(@Args("status") status: string): Promise<Status> {
    return this.StatusService.createStatus(status);
  }
}
