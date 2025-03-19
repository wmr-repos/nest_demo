import { CategoryService } from './../category/category.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsEntity } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, PostInfoDto } from './dto/create-post.dot';
import { TagService } from 'src/tag/tag.service';

export interface PostRo {
  list: PostsEntity[];
  count: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  // 创建文章
  async create(user, post: CreatePostDto): Promise<string> {
    const { title } = post;

    if (!title) {
      throw new HttpException('缺少标题', HttpStatus.BAD_REQUEST);
    }

    const doc = await this.postsRepository.findOne({ where: { title } });

    if (doc) {
      throw new HttpException('文章已存在', HttpStatus.BAD_REQUEST);
    }

    const { tag, category = 0, status, isRecommend } = post;

    const categoryDoc = await this.categoryService.findById(category);

    const tags = await this.tagService.findByIds(('' + tag).split(','));

    const postParam: Partial<PostsEntity> = {
      ...post,
      isRecommend: isRecommend ? 1 : 0,
      category: categoryDoc ?? undefined,
      tags: tags,
      author: user,
    };

    if (status === 'publish') {
      Object.assign(postParam, {
        publishTime: new Date(),
      });
    }

    const newPost: PostsEntity = this.postsRepository.create({
      ...postParam,
    });

    const created = await this.postsRepository.save(newPost);

    return created.id;
  }

  // 获取文章列表信息
  async findAll(query: { pageNum: number; pageSize: number }) {
    const qb = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.author', 'user')
      .orderBy('post.updateTime', 'DESC');
    qb.where('1 = 1');
    qb.orderBy('post.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    const result = posts.map((item) => item.toResponseObject());
    return { list: result, count: count };
  }

  // 获取指定文章
  async findById(id: number): Promise<PostInfoDto> {
    const qb = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.tag', 'tag')
      .leftJoinAndSelect('post.author', 'author')
      .where('post.id=:id')
      .setParameter('id', id);

    const result = await qb.getOne();

    if (!result) {
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST);
    }

    await this.postsRepository.update(id, { count: result.count + 1 });
    return result.toResponseObject();
  }

  // 更新文章
  async update(id: string, post: Partial<PostsEntity>): Promise<PostsEntity> {
    const existPost = await this.postsRepository.findOne({ where: { id } });

    if (!existPost) {
      throw new HttpException(`id为${id}文章不存在`, 401);
    }

    const updatePost = this.postsRepository.merge(existPost, post);

    return await this.postsRepository.save(updatePost);
  }

  // 删除文章
  async remove(id: string) {
    const existPost = await this.postsRepository.findOne({ where: { id } });

    if (!existPost) {
      throw new HttpException(`id为${id}文章不存在`, 401);
    }

    return await this.postsRepository.remove(existPost);
  }
}
