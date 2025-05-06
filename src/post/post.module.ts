import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
// import { PostUser } from '../user/entities/postuser.entity';
import { PostUser } from '../postuser/entities/postuser.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostUser])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
