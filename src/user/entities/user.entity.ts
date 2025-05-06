import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  username: string;

  @Exclude()
  @Column({ length: 25 })
  password: string;

  @Column({ length: 25, nullable: true })
  name: string;
}
