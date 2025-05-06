import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/interceptor/http-exception/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './core/filter/interceptor/transform/transform.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  // 注册全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  // 设置swagger注释
  const config = new DocumentBuilder()
    .setTitle('nest-study')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // 启用全局 CORS
  app.enableCors({
    origin: true, // 允许所有来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
    preflightContinue: false,
    optionsSuccessStatus: 204, // 预检请求成功的状态码
    credentials: true, // 允许携带 cookie
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => console.error(err));
