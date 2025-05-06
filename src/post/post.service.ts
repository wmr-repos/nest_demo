import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { QueryPostDto } from './dto/query-post.dto';
import { PostContentService } from '../postuser/services/postcontent.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private postContentService: PostContentService,
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

    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.title',
        'post.checkstatus',
        'post.hotstatus',
        'post.createtime',
        'post.commentcount',
        'post.likes',
        'post.readcount',
        'user.id',
        'user.name',
        'user.username',
        'user.avatar',
      ]);

    // 添加精确匹配条件
    if (id) {
      queryBuilder.andWhere('post.id = :id', { id });
    }

    if (name) {
      queryBuilder.andWhere('user.name LIKE :name', { name: `%${name}%` });
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
        '(post.title LIKE :keyword OR user.name LIKE :keyword)',
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

    // 获取每个帖子的content
    const postsWithContent = await Promise.all(
      posts.map(async (post) => {
        const content = await this.postContentService.getContentByPostId(post.id);
        console.log(`Content for post ${post.id}:`, content);
        return {
          ...post,
          content,
        };
      }),
    );

    return {
      list: postsWithContent,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
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
