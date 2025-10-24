import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int4' })
  age: number;

  @Column({ type: 'jsonb', nullable: true })
  address: object;

  @Column({ type: 'jsonb', nullable: true, name: 'additional_info' })
  additionalInfo: object;
}