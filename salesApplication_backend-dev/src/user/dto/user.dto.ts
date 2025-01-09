import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UsersDetailsType {
  @Field(() => ID)
  userId: number;

  @Field()
  name: string;

  @Field()
  role: string;

  @Field()
  email: string;

  @Field()
  userName: string;

  @Field()
  password: string;

  @Field()
  reportsTo: string;
}
