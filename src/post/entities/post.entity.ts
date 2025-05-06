import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discusspost')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: number;

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
