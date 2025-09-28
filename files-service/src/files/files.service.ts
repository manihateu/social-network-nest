import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  private readonly s3: S3Client;
  private readonly bucket = process.env.MINIO_BUCKET || 'social-bucket';

  constructor() {
    this.s3 = new S3Client({
      region: 'us-east-1',
      endpoint: process.env.MINIO_URL || 'http://localhost:9000',
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY || 'admin',
        secretAccessKey: process.env.MINIO_SECRET_KEY || 'admin123',
      },
    });
  }

  async uploadFile(file) {
    const key = `${uuid()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      url: `${process.env.MINIO_URL}/${this.bucket}/${key}`,
      key,
    };
  }

  async deleteFile(key: string) {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
    return { success: true };
  }
}
