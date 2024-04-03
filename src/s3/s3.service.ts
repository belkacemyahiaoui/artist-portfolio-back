import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFile(file: any, folder: string) {
    const { originalname } = file;

    return this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
      folder,
    );
  }

  async s3_upload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
    folder: string,
  ) {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucket,
      Key: `${folder}/${Date.now()}_${String(name)}`,
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response.Location;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
  }

  async removeFile(file: string) {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: this.AWS_S3_BUCKET,
      Key: file,
    };

    try {
      const s3Response = await this.s3.deleteObject(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
  }

  async localUpload(file: Buffer) {
    const fileName = `video-${Date.now()}.mp4`;
    const folderPath = 'uploads';
    try {
      // Create the folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      // Write the video file to the folder
      fs.writeFileSync(path.join(folderPath, fileName), file);

      // return the path to the video file with api: localhost:3000/uploads/video-163456789.mp4
      return `http://localhost:3000/${folderPath}/${fileName}`;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
