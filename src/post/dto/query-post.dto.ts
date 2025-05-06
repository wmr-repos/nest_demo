import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsIn,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QueryPostDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize?: number = 10;

  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @Type(() => Number)
  @IsOptional()
  checkstatus?: number;

  @Type(() => Number)
  @IsOptional()
  hotstatus?: number;

  @IsString()
  @IsOptional()
  keyword?: string;

  @IsString()
  @IsOptional()
  sortField?: string = 'createtime';

  @IsString()
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
