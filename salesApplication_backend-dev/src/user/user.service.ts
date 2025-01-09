import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersDetails } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersDetails)
    private readonly userRepository: Repository<UsersDetails>
  ) {}
  // Method to create a new user
  async create(data: Partial<UsersDetails>): Promise<UsersDetails> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
  // Method to fetch all users
  async findAll(): Promise<UsersDetails[]> {
    return this.userRepository.find();
  }
  // Method to find a user by their username
  async findByUserName(userName: string): Promise<UsersDetails> {
    return this.userRepository.findOne({ where: { userName } });
  }
}
