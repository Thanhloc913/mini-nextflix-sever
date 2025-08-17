import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'admins' })
export class Admin {
  @PrimaryGeneratedColumn('uuid', { name: 'admin_id' })
  adminId!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username!: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 256 })
  passwordHash!: string;

  @Column({ type: 'varchar', length: 50 })
  role!: 'admin' | 'superadmin';

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
  deleteAt!: Date | null;
}
