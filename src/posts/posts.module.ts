import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './entities/posts.entity';
import { PostsController } from './posts.controller';
import { TagModule } from 'src/tag/tag.module';
import { CategoryModule } from 'src/category/category.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([PostsEntity]),
    forwardRef(() => CategoryModule),
    forwardRef(() => TagModule),
    JwtService,
  ],
  controllers: [PostsController],
})
export class PostsModule {}
