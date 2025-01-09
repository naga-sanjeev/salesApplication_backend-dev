import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./account.entity";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}
  // Method to fetch all accounts for dropdown
  findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }
  // Method to create a new account
  create(accountType: string): Promise<Account> {
    const account = this.accountRepository.create({ accountType });
    return this.accountRepository.save(account);
  }
}
