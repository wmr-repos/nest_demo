import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { OssService } from './oss.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('上传')
@Controller('upload')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post()
  @ApiOperation({ summary: '上传图片' })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.ossService.uploadFile(file);
  }
}
