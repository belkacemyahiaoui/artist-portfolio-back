import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { S3Service } from './s3/s3.service';
import { TypeormConfigModule } from './config/typeorm.module';

@Module({
  imports: [TypeormConfigModule, VideosModule],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
