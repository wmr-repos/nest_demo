import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Body() user: LoginDto, @Req() req: { user: User }) {
    console.log('req', req.user);
    return this.authService.login(req.user);
  }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(id);
  // }
}
