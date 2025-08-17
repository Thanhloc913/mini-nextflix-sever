import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	ManyToOne,
} from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'comments' })
export class Comment {
	@PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
	commentId!: string;

	@ManyToOne(() => Movie, (movie) => movie.comments, { onDelete: 'CASCADE' })
	movie!: Movie;

	@ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
	user!: User;

	@Column({ type: 'text' })
	content!: string;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
	createdAt!: Date;

	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
	deleteAt!: Date | null;
}




