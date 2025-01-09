import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { AttachmentsService } from "./attachments.service";

@Controller("attachments")
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  //Method to upload project architechture into AWS S3
  @Post()
  @UseInterceptors(FileInterceptor("Attachments", {}))
  async attachments(@UploadedFile() file: Express.Multer.File) {
    const filename = `${file.originalname.split(" ").join("_")}`;
    return await this.attachmentsService.saveAttachment(filename, file.buffer);
  }
}
