import { PartialType } from '@nestjs/swagger';
import { CreatePostuserDto } from './create-postuser.dto';

export class UpdatePostuserDto extends PartialType(CreatePostuserDto) {}
