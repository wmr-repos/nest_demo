import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取上下文
    const response = ctx.getResponse<Response>(); // 获取请求上下文的response对象
    const status = exception.getStatus(); // 获取异常的状态码

    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;

    const errorResponse = {
      data: {},
      message: message,
      code: -1,
    };

    // 设置返回的状态码、错误信息、错误信息对象
    response.status(status);
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
