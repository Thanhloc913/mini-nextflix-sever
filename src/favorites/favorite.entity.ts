import { Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Entity({ name: 'favorites' })
export class Favorite {
	@PrimaryGeneratedColumn('uuid', { name: 'id' })
	id!: string;

	@ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
	user!: User;

	@ManyToOne(() => Movie, (movie) => movie.favorites, { onDelete: 'CASCADE' })
	movie!: Movie;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
	createdAt!: Date;

	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
	deleteAt!: Date | null;
}




