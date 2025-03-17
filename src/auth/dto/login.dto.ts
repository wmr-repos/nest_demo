import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名', default: '用户1' })
  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string;

  @ApiProperty({ description: '密码', default: '123' })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}
