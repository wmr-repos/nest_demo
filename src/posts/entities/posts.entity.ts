import { Exclude } from 'class-transformer';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostInfoDto } from '../dto/create-post.dot';

// 文章实体
@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  // 文章标题
  @Column({ length: 50 })
  title: string;

  // markdown内容
  @Column({ type: 'mediumtext', default: null })
  content: string;

  // markdown转html，自动生成
  @Column({ type: 'mediumtext', default: null, name: 'content_html' })
  contentHtml: string;

  // 摘要自动生成
  @Column({ type: 'text', default: null })
  summary: string;

  // 封面图
  @Column({ default: null, name: 'cover_url' })
  coverUrl: string;

  // 阅读量
  @Column({ type: 'int', default: 0 })
  count: string;

  // 点赞量
  @Column({ type: 'int', default: 0, name: 'like_count' })
  likeCount: number;

  // 推荐显示
  @Column({ type: 'tinyint', default: 0, name: 'is_recommend' })
  isRecommend: number;

  // 文章状态
  @Column({ type: 'simple-enum', enum: ['draft', 'publish'] })
  status: string;

  // 作者
  @ManyToOne((type) => User, (user) => user.posts)
  author: User;

  // 分类
  @Exclude()
  @ManyToOne(() => CategoryEntity, (category) => category.posts)
  @JoinColumn({
    name: 'category_id',
  })
  category: CategoryEntity;

  // 标签
  @ManyToMany(() => TagEntity, (tag) => tag.posts)
  @JoinTable({
    name: 'post_tag',
    joinColumns: [{ name: 'post_id' }],
    inverseJoinColumns: [{ name: 'tag_id' }],
  })
  tags: TagEntity[];

  @Column({
    type: 'timestamp',
    name: 'publish_time',
    default: null,
  })
  publishTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;

  toResponseObject(): PostInfoDto {
    const responseObj: PostInfoDto = {
      ...this,
      isRecommend: this.isRecommend ? true : false,
    };

    if (this.category) {
      responseObj.category = this.category.name;
    }

    if (this.tags && this.tags.length) {
      responseObj.tags = this.tags.map((item) => item.name);
    }

    if (this.author && this.author.id) {
      responseObj.userId = this.author.id;
      responseObj.author = this.author.nickname || this.author.username;
    }

    return responseObj;
  }
}
