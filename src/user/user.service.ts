import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
// import { SnowflakeService } from 'src/snowflake/snowflake.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // private snowflakeService: SnowflakeService,
  ) {}

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
