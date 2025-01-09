import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Industries } from "./industries.entity";

@Injectable()
export class IndustriesService {
  constructor(
    @InjectRepository(Industries)
    private readonly industriesRepository: Repository<Industries>
  ) {}

  // Method to fetch all Industries for dropdown
  findAll(): Promise<Industries[]> {
    return this.industriesRepository.find();
  }
  // Method to create a new Industrie
  create(name: string): Promise<Industries> {
    const industry = this.industriesRepository.create({ name });
    return this.industriesRepository.save(industry);
  }
}
