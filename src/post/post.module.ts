import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
// import { PostUser } from '../user/entities/postuser.entity';
import { PostUser } from '../postuser/entities/postuser.entity'
import { PostContent, PostContentSchema } from '../postuser/entities/postcontent.entity';
import { PostContentService } from '../postuser/services/postcontent.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    MongooseModule.forFeature([
      { name: PostContent.name, schema: PostContentSchema }
    ])
  ],
  controllers: [PostController],
  providers: [PostService, PostContentService],
})
export class PostModule {}
