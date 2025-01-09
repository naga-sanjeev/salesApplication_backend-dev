import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MenuType {
  @Field(() => ID)
  menuId: number;

  @Field()
  role: string;

  @Field()
  screens: string;
}
