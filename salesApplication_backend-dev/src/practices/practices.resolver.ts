// practices.resolver.ts
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Practices } from "./practices.entity";
import { PracticesService } from "./practices.service";

@Resolver((of) => Practices)
export class PracticesResolver {
  constructor(private readonly practicesService: PracticesService) {}

  //  Query to fetch all Practices for dropdown
  @Query((returns) => [Practices])
  async getPractices(): Promise<Practices[]> {
    return this.practicesService.findAll();
  }

  // Method to create a new Practices
  @Mutation((returns) => Practices)
  async createPractice(@Args("name") name: string): Promise<Practices> {
    return this.practicesService.create(name);
  }
}
