import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class PostUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  username: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 50, nullable: true })
  name: string;

  @Column({ length: 40 })
  phone: string;

  @Column({ length: 70, nullable: true })
  email: string;

  @Column({ length: 100, nullable: true })
  address: string;

  @Column({ length: 150, nullable: true })
  avatar: string;
}
