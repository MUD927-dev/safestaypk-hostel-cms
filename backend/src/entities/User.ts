import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcrypt';

export enum UserRole {
    Student = 'Student',
    ParentGuardian = 'ParentGuardian',
    HostelOwner = 'HostelOwner',
    Admin = 'Admin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, length: 255 })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ name: 'first_name', length: 100 })
    firstName: string;

    @Column({ name: 'last_name', length: 100 })
    lastName: string;

    @Column({
        type: process.env.NODE_ENV === 'test' ? 'varchar' : 'enum',
        enum: process.env.NODE_ENV === 'test' ? undefined : UserRole,
        default: UserRole.Student,
    })
    role: UserRole;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ type: 'varchar', name: 'refresh_token', nullable: true, select: false })
    refreshToken: string | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // ─── Hooks ──────────────────────────────────────────────
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        // Only re-hash if password was actually changed (not already a bcrypt hash)
        if (this.password && !this.password.startsWith('$2b$')) {
            this.password = await bcrypt.hash(this.password, 12);
        }
    }

    async comparePassword(plain: string): Promise<boolean> {
        return bcrypt.compare(plain, this.password);
    }
}
