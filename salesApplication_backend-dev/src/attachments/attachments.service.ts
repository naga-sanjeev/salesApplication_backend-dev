import { Injectable } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Attachments } from "./attachments.entity";
import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";

@Injectable()
export class AttachmentsService {
  private s3: AWS.S3;
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow("aws_S3_Region"),
  });
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Attachments)
    private readonly attachmentRepository: Repository<Attachments>
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.getOrThrow("aws_Access_Key_ID"),
      secretAccessKey: this.configService.getOrThrow("aws_Secret_Access_Key"),
    });
  }
  //Method to upload project architechture into AWS S3
  async saveAttachment(filename: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow("aws_S3_Bucket"),
        Key: filename,
        Body: file,
        ACL: "public-read",
      })
    );
    const s3Url = `https://${this.configService.getOrThrow("aws_S3_Bucket")}.s3.amazonaws.com/${filename}`;
    const attachments = new Attachments();
    attachments.filename = filename;
    attachments.s3Url = s3Url;
    return {
      message: "successfully File upload to AWS S3",
      data: await this.attachmentRepository.save(attachments),
    };
  }
}
