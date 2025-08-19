import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { Genre } from '../genres/genre.entity';
import type {
  CreateMovieDto,
  MovieQueryDto,
  UpdateMovieDto,
} from './movies.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private readonly movieRepo: Repository<Movie>,
    @InjectRepository(Genre) private readonly genreRepo: Repository<Genre>,
  ) {}

  async findAll(query: MovieQueryDto) {
    const page = Math.max(1, Number(query.page || 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit || 20)));
    const qb = this.movieRepo
      .createQueryBuilder('m')
      .leftJoinAndSelect('m.genres', 'g')
      .andWhere('m.deleted_at IS NULL');

    if (query.genreId) {
      qb.andWhere('g.genre_id = :gid', { gid: query.genreId });
    }
    if (query.ratingMin != null) {
      qb.andWhere('m.rating >= :rmin', { rmin: query.ratingMin });
    }
    if (query.ratingMax != null) {
      qb.andWhere('m.rating <= :rmax', { rmax: query.ratingMax });
    }
    if (query.q) {
      qb.andWhere('LOWER(m.title) LIKE :q', { q: `%${String(query.q).toLowerCase()}%` });
    }

    qb.orderBy('m.rating', 'DESC').skip((page - 1) * limit).take(limit);
    return qb.getMany();
  }

  async findOne(id: number) {
    const movie = await this.movieRepo.findOne({
      where: { movieId: id },
      relations: { genres: true, episodes: true },
    });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async create(
    dto: CreateMovieDto,
    actor: { kind: 'user' | 'admin'; sub: string },
  ) {
    if (actor.kind !== 'admin') throw new ForbiddenException('Admin only');
    const movie = this.movieRepo.create({
      title: dto.title,
      description: dto.description ?? null,
      releaseDate: dto.releaseDate ?? null,
      duration: dto.duration ?? null,
      rating: dto.rating ?? null,
      posterUrl: dto.posterUrl ?? null,
      videoUrl: dto.videoUrl ?? null,
      uploadedBy: actor.sub,
    });
    if (dto.genreIds && dto.genreIds.length) {
      const genres = await this.genreRepo.find({ where: { genreId: In(dto.genreIds) } });
      movie.genres = genres;
    }
    return this.movieRepo.save(movie);
  }

  async update(id: number, dto: UpdateMovieDto, actor: { kind: 'user' | 'admin' }) {
    if (actor.kind !== 'admin') throw new ForbiddenException('Admin only');
    const movie = await this.findOne(id);
    if (dto.title !== undefined) movie.title = dto.title;
    if (dto.description !== undefined) movie.description = dto.description ?? null;
    if (dto.releaseDate !== undefined) movie.releaseDate = dto.releaseDate ?? null;
    if (dto.duration !== undefined) movie.duration = dto.duration ?? null;
    if (dto.rating !== undefined) movie.rating = dto.rating ?? null;
    if (dto.posterUrl !== undefined) movie.posterUrl = dto.posterUrl ?? null;
    if (dto.videoUrl !== undefined) movie.videoUrl = dto.videoUrl ?? null;
    if (dto.genreIds) {
      const genres = await this.genreRepo.find({ where: { genreId: In(dto.genreIds) } });
      movie.genres = genres;
    }
    return this.movieRepo.save(movie);
  }

  async remove(id: number, actor: { kind: 'user' | 'admin' }) {
    if (actor.kind !== 'admin') throw new ForbiddenException('Admin only');
    await this.movieRepo.softDelete({ movieId: id });
  }
}