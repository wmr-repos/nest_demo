import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PostUser } from '../../postuser/entities/postuser.entity';

@Entity('discusspost')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: number;

  @ManyToOne(() => PostUser)
  @JoinColumn({ name: 'userid' })
  user: PostUser;

  @Column()
  title: string;

  @Column()
  checkstatus: number;

  @Column()
  hotstatus: number;

  @Column()
  createtime: string;

  @Column({ nullable: true })
  commentcount: number;

  @Column({ nullable: true })
  likes: number;

  @Column({ nullable: true })
  readcount: number;
}
