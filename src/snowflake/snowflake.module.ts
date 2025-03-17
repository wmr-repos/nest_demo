import { Module } from '@nestjs/common';
import { SnowflakeController } from './snowflake.controller';
import { SnowflakeService } from './snowflake.service';

@Module({
  controllers: [SnowflakeController],
  providers: [SnowflakeService],
  exports: [SnowflakeService],
})
export class SnowflakeModule {}
