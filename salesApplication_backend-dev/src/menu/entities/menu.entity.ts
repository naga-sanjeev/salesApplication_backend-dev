import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  menuId: number;

  @Column()
  role: string;

  @Column()
  screens: string;
}