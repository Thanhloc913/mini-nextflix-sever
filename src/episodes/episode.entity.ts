import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn } from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Entity({ name: 'episodes' })
export class Episode {
	@PrimaryGeneratedColumn({ name: 'episode_id', type: 'integer' })
	episodeId!: number;

	@ManyToOne(() => Movie, (movie) => movie.episodes, { onDelete: 'CASCADE' })
	movie!: Movie;

	@Column({ type: 'varchar', length: 255 })
	title!: string;

	@Column({ name: 'video_url', type: 'varchar', length: 255, nullable: true })
	videoUrl!: string | null;

	@Column({ type: 'int', nullable: true })
	duration!: number | null;

	@Column({ name: 'episode_no', type: 'int', nullable: true })
	episodeNo!: number | null;

	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
	deleteAt!: Date | null;
}




