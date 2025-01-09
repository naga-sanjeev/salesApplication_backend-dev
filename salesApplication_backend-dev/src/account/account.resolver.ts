import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Account } from "./account.entity";
import { AccountService } from "./account.service";

@Resolver((of) => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  // Method to fetch all accounts for dropdown
  @Query((returns) => [Account])
  async getAccounts(): Promise<Account[]> {
    return this.accountService.findAll();
  }
  // Method to create a new account
  @Mutation((returns) => Account)
  async createAccount(
    @Args("accountType") accountType: string
  ): Promise<Account> {
    return this.accountService.create(accountType);
  }
}
