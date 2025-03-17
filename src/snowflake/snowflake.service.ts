import { Injectable } from '@nestjs/common';
import { SnowflakeIdWorker } from 'snowflake-id';

@Injectable()
export class SnowflakeService {
  private snowflakeIdWorker: SnowflakeIdWorker;

  constructor() {
    this.snowflakeIdWorker = new SnowflakeIdWorker(1, 1);
  }

  generateId(): bigint {
    return this.snowflakeIdWorker.nextId();
  }
}
