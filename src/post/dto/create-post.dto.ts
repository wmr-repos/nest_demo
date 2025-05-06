import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  userid: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  checkstatus: number;

  @IsNotEmpty()
  @IsNumber()
  hotstatus: number;

  @IsNotEmpty()
  @IsString()
  createtime: string;

  @IsOptional()
  @IsNumber()
  commentcount?: number;

  @IsOptional()
  @IsNumber()
  likes?: number;

  @IsOptional()
  @IsNumber()
  readcount?: number;
}
