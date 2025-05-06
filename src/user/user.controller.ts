import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserInfo(@Req() req: { user: User }) {
    console.log('req', req);

    return req.user;
  }
}
