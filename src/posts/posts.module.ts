import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './entities/posts.entity';
import { PostsController } from './posts.controller';

@Module({
  providers: [PostsService],
  imports: [TypeOrmModule.forFeature([PostsEntity])],
  controllers: [PostsController],
})
export class PostsModule {}
