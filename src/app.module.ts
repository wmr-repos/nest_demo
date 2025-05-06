import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from '../config/env';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        // entities: [PostsEntity],
        autoLoadEntities: true,
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', 'root'),
        database: configService.get('DB_DATABASE', 'quit'),
        timezone: '+08:00',
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {}
