import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { PostuserService } from './postuser.service';
import { PostuserController } from './postuser.controller';
import { PostUser } from './entities/postuser.entity';
import { PostContent, PostContentSchema } from './entities/postcontent.entity';
import { PostContentService } from './services/postcontent.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostUser]),
    MongooseModule.forFeature([
      { name: PostContent.name, schema: PostContentSchema },
    ]),
  ],
  controllers: [PostuserController],
  providers: [PostuserService, PostContentService],
  exports: [PostContentService],
})
export class PostuserModule {}
