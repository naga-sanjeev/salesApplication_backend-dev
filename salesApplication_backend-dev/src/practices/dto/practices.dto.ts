import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MenuType {
  @Field(() => ID)
  practiceId: number;

  @Field()
  name: string;
}




