import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostContent } from '../entities/postcontent.entity';

@Injectable()
export class PostContentService {
  constructor(
    @InjectModel(PostContent.name)
    private postContentModel: Model<PostContent>,
  ) {}

  async findByContentId(contentId: number): Promise<PostContent | null> {
    try {
      const allDocs = await this.postContentModel.find().exec();

      // 使用精确匹配查询
      const result = await this.postContentModel
        .findOne({
          contentid: contentId,
          entitytype: 1, // 添加 entitytype 条件
        })
        .exec();

      return result;
    } catch (error) {
      return null;
    }
  }

  async getContentByPostId(postId: number): Promise<string | null> {
    try {
      const postContent = await this.findByContentId(postId);
      return postContent?.content || null;
    } catch (error) {
      return null;
    }
  }
}
