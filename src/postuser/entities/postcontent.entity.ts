import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'discusspost' })
export class PostContent extends Document {
  @Prop({ required: true, field: 'contentid' })
  contentid: number;

  @Prop({ required: true, field: 'entitytype' })
  entitytype: number;

  @Prop({ required: true, field: 'content' })
  content: string;

  @Prop({ field: '_class' })
  _class: string;
}

export const PostContentSchema = SchemaFactory.createForClass(PostContent);
