import { Module } from "@nestjs/common";
import { AttachmentsService } from "./attachments.service";
import { AttachmentsController } from "./attachments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attachments } from "./attachments.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Attachments])],
  providers: [AttachmentsService],
  controllers: [AttachmentsController],
})
export class AttachmentsModule {}
