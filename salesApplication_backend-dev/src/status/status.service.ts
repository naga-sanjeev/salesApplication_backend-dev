import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Status } from "./status.entity";

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>
  ) {}

  //  Method to fetch all Project Status like active/inactive
  getStatus(): Promise<Status[]> {
    return this.statusRepository.find();
  }

  // Method to create a new Project Status
  createStatus(status: string): Promise<Status> {
    const result = this.statusRepository.create({ status });
    return this.statusRepository.save(result);
  }
}
