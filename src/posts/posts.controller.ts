import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService, PostRo } from './posts.service';
import { PostsEntity } from './entities/posts.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dot';
import { Roles, RolesGuard } from 'src/auth/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@ApiBearerAuth()
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
  @ApiBearerAuth()
  @Roles('admin', 'root')
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async create(@Body() post: CreatePostDto, @Req() req: { user: User }) {
    return await this.postsService.create(req.user, post);
  }

  /**
   * 获取所有文章
   * @param query
   * @returns
   */
  @ApiOperation({ summary: '获取所有文章' })
  @Get()
  async findAll(@Query() query) {
    return await this.postsService.findAll(query);
  }

  @ApiOperation({ summary: '根据id获取文章' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.postsService.findById(id);
  }

  @ApiOperation({ summary: '根据id修改文章' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() post: Partial<PostsEntity>) {
    return this.postsService.update(id, post);
  }

  @ApiOperation({ summary: '根据id删除文章' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
