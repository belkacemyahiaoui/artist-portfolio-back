import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/s3/s3.service';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    public readonly videoRepository: Repository<Video>,
    public readonly s3Service: S3Service,
  ) {}
  async create(createVideoDto: CreateVideoDto, file: Express.Multer.File) {
    console.log(typeof file)
    console.log(file)
    const url = await this.s3Service.localUpload(file.buffer);
    const video = this.videoRepository.insert({
      ...createVideoDto,
      url,
    });
    return video;
  }

  findAll() {
    return this.videoRepository.find();
  }

  findOne(id: number) {
    return this.findOne(id);
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    const video = this.findOne(id);
    if (video) {
      return this.videoRepository.save({
        ...video,
        ...updateVideoDto,
      });
    }
  }

  remove(id: number) {
    return this.videoRepository.delete(id);
  }
}
