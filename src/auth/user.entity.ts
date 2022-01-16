import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 250 })
  email: string;

  @Column({ length: 72 })
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 60 })
  paternal_name: string;

  @Column({ length: 60, nullable: true })
  maternal_name: string;

  @Column({ type: 'text'})
  permissions: string;

  // @Column('datetime', { nullable: true })
  // loggedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  // // @UpdateDateColumn()
  // @Column('datetime', { nullable: true })
  // updatedAt: Date;
}
