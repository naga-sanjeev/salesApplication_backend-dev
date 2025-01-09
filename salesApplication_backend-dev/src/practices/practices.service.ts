import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Practices } from "./practices.entity";

@Injectable()
export class PracticesService {
  constructor(
    @InjectRepository(Practices)
    private readonly practicesRepository: Repository<Practices>
  ) {}
  //  Method to fetch all Practices for dropdown
  findAll(): Promise<Practices[]> {
    return this.practicesRepository.find();
  }
  // Method to create a new Practices
  create(name: string): Promise<Practices> {
    const practice = this.practicesRepository.create({ name });
    return this.practicesRepository.save(practice);
  }
}
