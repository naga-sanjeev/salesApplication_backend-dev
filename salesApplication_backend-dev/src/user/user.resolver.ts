import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UsersDetailsType } from "./dto/user.dto";
import { UsersDetails } from "./user.entity";
import * as bcrypt from "bcrypt";

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Query to fetch all users
  @Query(() => [UsersDetailsType])
  async getUsers() {
    try {
      const result = [];
      const getUser = await this.userService.findAll();
      if (getUser.length != 0 || getUser.length != null) {
        getUser.forEach((element) => {
          result.push({
            userId: element.userId ? element.userId : "",
            name: element.name ? element.name : "",
            role: element.role ? element.role : "",
            email: element.email ? element.email : "",
            userName: element.userName ? element.userName : "",
            password: element.password ? element.password : "",
            reportsTo: element.reportsTo ? element.reportsTo : "",
          });
        });
      }
      return result;
    } catch (error) {
      return error;
    }
  }

  // Mutation to create a new user
  @Mutation(() => UsersDetailsType)
  async createUser(
    @Args("name") name: string,
    @Args("role") role: string,
    @Args("email") email: string,
    @Args("userName") userName: string,
    @Args("password") password: string,
    @Args("reportsTo") reportsTo: string
  ) {
    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
      return this.userService.create({
        name,
        role,
        email,
        userName,
        password: hashedPassword,
        reportsTo,
      });
    } catch (error) {
      return error;
    }
  }

  // Mutation to login a user
  @Mutation(() => UsersDetailsType)
  async userLogin(
    @Args("userName") userName: string,
    @Args("password") password: string
  ) {
    try {
      // Find the user by their username
      const user = await this.userService.findByUserName(userName);
      if (!user) {
        // Throw an error if user is not found
        throw new Error("User not found");
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        // Throw an error if password doesn't match
        throw new Error("Invalid password");
      }

      // If the password matches, return the user
      return user;
    } catch (error) {
      return error;
    }
  }

}
