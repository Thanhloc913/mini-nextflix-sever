import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, DeleteDateColumn } from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Entity({ name: 'genres' })
export class Genre {
	@PrimaryGeneratedColumn({ name: 'genre_id', type: 'integer' })
	genreId!: number;

	@Column({ type: 'varchar', length: 50, unique: true })
	name!: string;

	@ManyToMany(() => Movie, (movie) => movie.genres)
	movies!: Movie[];

	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
	deleteAt!: Date | null;
}
