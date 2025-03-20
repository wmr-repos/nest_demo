import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OSS from 'ali-oss';

@Injectable()
export class OssService {
  private client: OSS;

  constructor(private readonly configService: ConfigService) {
    // 从配置服务中获取 OSS 配置
    const region = this.configService.get<string>('OSS_REGION');
    const accessKeyId = this.configService.get<string>('OSS_ACCESS_KEY_ID');
    const accessKeySecret = this.configService.get<string>(
      'OSS_ACCESS_KEY_SECRET',
    );
    const bucket = this.configService.get<string>('OSS_BUCKET_NAME');

    if (!region || !accessKeyId || !accessKeySecret || !bucket) {
      throw new Error('OSS configuration is incomplete');
    }

    // 初始化 OSS 客户端
    this.client = new OSS({
      region,
      accessKeyId,
      accessKeySecret,
      bucket,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    try {
      // 上传文件到 OSS
      const result = await this.client.put(fileName, file.buffer);
      return result.url; // 返回上传后的文件 URL
    } catch (error) {
      console.error('OSS upload error:', error);
      throw new Error('Failed to upload file to OSS');
    }
  }
}
