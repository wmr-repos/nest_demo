import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '标题不能为空' })
  readonly title: string;

  @IsNotEmpty({ message: '作者不能为空' })
  @ApiProperty({ description: '作者' })
  readonly author: string;

  @ApiProperty({ description: '内容' })
  readonly content: string;

  @ApiProperty({ description: '文章封面' })
  readonly cover_url: string;

  @IsNumber()
  @ApiProperty({ description: '文章类型' })
  readonly type: number;
}
