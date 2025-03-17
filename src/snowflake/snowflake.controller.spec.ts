import { Test, TestingModule } from '@nestjs/testing';
import { SnowflakeController } from './snowflake.controller';

describe('SnowflakeController', () => {
  let controller: SnowflakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnowflakeController],
    }).compile();

    controller = module.get<SnowflakeController>(SnowflakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
