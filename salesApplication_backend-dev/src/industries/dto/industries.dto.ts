import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MenuType {
  @Field(() => ID)
  industryId: number;

  @Field()
  name: string;
}