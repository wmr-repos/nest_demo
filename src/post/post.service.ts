import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { QueryPostDto } from './dto/query-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAll(query: QueryPostDto) {
    const {
      page = 1,
      pageSize = 10,
      id,
      name,
      checkstatus,
      hotstatus,
      keyword,
      sortField = 'createtime',
      sortOrder = 'DESC',
    } = query;

    const queryBuilder = this.postRepository.createQueryBuilder('post');

    // 添加精确匹配条件
    if (id) {
      queryBuilder.andWhere('post.id = :id', { id });
    }

    if (name) {
      queryBuilder.andWhere('post.name = :name', { name });
    }

    if (checkstatus !== undefined) {
      queryBuilder.andWhere('post.checkstatus = :checkstatus', { checkstatus });
    }

    if (hotstatus !== undefined) {
      queryBuilder.andWhere('post.hotstatus = :hotstatus', { hotstatus });
    }

    // 添加模糊搜索条件
    if (keyword) {
      queryBuilder.andWhere(
        '(post.title LIKE :keyword OR post.content LIKE :keyword)',
        {
          keyword: `%${keyword}%`,
        },
      );
    }

    // 添加排序
    queryBuilder.orderBy(`post.${sortField}`, sortOrder);

    // 添加分页
    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    const [posts, total] = await queryBuilder.getManyAndCount();

    return {
      list: posts,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    return this.postRepository.remove(post);
  }
}
