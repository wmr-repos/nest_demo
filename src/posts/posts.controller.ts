import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService, PostRo } from './posts.service';
import { PostsEntity } from './entities/posts.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dot';

@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 创建文章
   * @param post
   * @returns
   */
  @ApiOperation({ summary: '创建文章' })
  @Post()
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }

  /**
   * 获取所有文章
   * @param query
   * @returns
   */
  @ApiOperation({ summary: '获取所有文章' })
  @Get()
  async findAll(@Query() query): Promise<PostRo> {
    return await this.postsService.findAll(query);
  }

  @ApiOperation({ summary: '根据id获取文章' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.postsService.findById(id);
  }

  @ApiOperation({ summary: '根据id修改文章' })
  @Put(':id')
  async update(@Param('id') id: number, @Body() post: Partial<PostsEntity>) {
    return this.postsService.update(id, post);
  }

  @ApiOperation({ summary: '根据id删除文章' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
