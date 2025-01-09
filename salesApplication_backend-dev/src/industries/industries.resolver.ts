import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Industries } from "./industries.entity";
import { IndustriesService } from "./industries.service";

@Resolver((of) => Industries) // Specify the type for the resolver
export class IndustriesResolver {
  constructor(private readonly industriesService: IndustriesService) {}

  // Method to fetch all Industries for dropdown
  @Query((returns) => [Industries])
  async getIndustries(): Promise<Industries[]> {
    return this.industriesService.findAll();
  }
  // Method to create a new Industrie
  @Mutation((returns) => Industries)
  async createIndustry(@Args("name") name: string): Promise<Industries> {
    return this.industriesService.create(name);
  }
}
