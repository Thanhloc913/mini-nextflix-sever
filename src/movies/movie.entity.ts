import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToMany,
	OneToMany,
	JoinTable,
} from 'typeorm';
import { Genre } from '../genres/genre.entity';
import { Comment } from '../comments/comment.entity';
import { Favorite } from '../favorites/favorite.entity';
import { Episode } from '../episodes/episode.entity';

@Entity({ name: 'movies' })
export class Movie {
	@PrimaryGeneratedColumn({ name: 'movie_id', type: 'integer' })
	movieId!: number;

	@Column({ type: 'varchar', length: 255 })
	title!: string;

	@Column({ type: 'text', nullable: true })
	description!: string | null;

	@Column({ name: 'release_date', type: 'date', nullable: true })
	releaseDate!: string | null;

	@Column({ type: 'int', nullable: true })
	duration!: number | null;

	@Column({ type: 'float', nullable: true })
	rating!: number | null;

	@Column({ name: 'poster_url', type: 'varchar', length: 255, nullable: true })
	posterUrl!: string | null;

	@Column({ name: 'video_url', type: 'varchar', length: 255, nullable: true })
	videoUrl!: string | null;

	@Column({ name: 'uploaded_by', type: 'uuid', nullable: true })
	uploadedBy!: string | null;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
	createdAt!: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
	updatedAt!: Date;

	@ManyToMany(() => Genre, (genre) => genre.movies, { cascade: false })
	@JoinTable({
		name: 'movie_genres',
		joinColumn: { name: 'movie_id', referencedColumnName: 'movieId' },
		inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'genreId' },
	})
	genres!: Genre[];

	@OneToMany(() => Comment, (comment) => comment.movie)
	comments!: Comment[];

	@OneToMany(() => Favorite, (favorite) => favorite.movie)
	favorites!: Favorite[];

	@OneToMany(() => Episode, (episode) => episode.movie)
	episodes!: Episode[];

	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
	deleteAt!: Date | null;
}




