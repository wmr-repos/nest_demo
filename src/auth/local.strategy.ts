import { IStrategyOptions, Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<any> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.username=:username', { username });

    const user = await query.getOne();
    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }

    if (password !== user.password) {
      throw new BadRequestException('密码错误！');
    }
    return user;
  }
}
