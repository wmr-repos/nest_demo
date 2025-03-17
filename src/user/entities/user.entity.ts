import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100 })
  nickname: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    if (!this.password) {
      throw new Error('Password is required');
    }
    this.password = await bcrypt.hash(this.password, 10);
  }
}
