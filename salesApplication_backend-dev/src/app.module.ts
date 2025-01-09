import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { UserModule } from "./user/user.module";
import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
// import { forwardRef } from "@nestjs/common";
import { DatabaseModule } from "./config/config.module";
import { ConfigModule } from "@nestjs/config";
import { MenuModule } from "./menu/menu.module";
import { AccountModule } from "./account/account.module";
import { IndustriesModule } from "./industries/industries.module";
import { PracticesModule } from "./practices/practices.module";
import { ProjectsModule } from "./projects/projects.module";
import { UpdateModule } from "./status/status.module";
import { MulterModule } from "@nestjs/platform-express";
import { AttachmentsModule } from "./attachments/attachments.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    MenuModule,
    IndustriesModule,
    PracticesModule,
    AccountModule,
    ProjectsModule,
    UpdateModule,
    MulterModule.register({ dest: "./uploads" }),
    AttachmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
