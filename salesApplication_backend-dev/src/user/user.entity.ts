import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UsersDetails {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column()
  reportsTo: string;
}
