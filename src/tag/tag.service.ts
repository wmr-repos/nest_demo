import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async create(tag: CreateTagDto) {
    const newTag = this.tagRepository.create(tag);
    return await this.tagRepository.save(newTag);
  }

  findByName() {}

  async findByIds(ids: string[]) {
    return this.tagRepository.findByIds(ids);
  }
}
