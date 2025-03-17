import { HttpException, Injectable } from '@nestjs/common';
import { PostsEntity } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dot';

export interface PostRo {
  list: PostsEntity[];
  count: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  // 创建文章
  async create(post: CreatePostDto): Promise<PostsEntity> {
    const { title } = post;

    if (!title) {
      throw new HttpException('缺少标题', 422);
    }

    const doc = await this.postsRepository.findOne({ where: { title } });

    if (doc) {
      throw new HttpException('文章已存在', 401);
    }

    return await this.postsRepository.save(post);
  }

  // 获取文章列表信息
  async findAll(query) {
    const qb = this.postsRepository.createQueryBuilder('posts');
    qb.where('1 = 1');
    qb.orderBy('posts.created_time', 'DESC');

    const count = await qb.getCount();

    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();

    return { list: posts, count };
  }

  // 获取指定文章
  async findById(id: number): Promise<PostsEntity> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('文章不存在', 401);
    }
    return post;
  }

  // 更新文章
  async update(id: number, post: Partial<PostsEntity>): Promise<PostsEntity> {
    const existPost = await this.postsRepository.findOne({ where: { id } });

    if (!existPost) {
      throw new HttpException(`id为${id}文章不存在`, 401);
    }

    const updatePost = this.postsRepository.merge(existPost, post);

    return await this.postsRepository.save(updatePost);
  }

  // 删除文章
  async remove(id: number) {
    const existPost = await this.postsRepository.findOne({ where: { id } });

    if (!existPost) {
      throw new HttpException(`id为${id}文章不存在`, 401);
    }

    return await this.postsRepository.remove(existPost);
  }
}

