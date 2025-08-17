import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './episode.entity';
import { Movie } from '../movies/movie.entity';
import type { CreateEpisodeDto, UpdateEpisodeDto } from './episodes.dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode) private readonly episodeRepo: Repository<Episode>,
    @InjectRepository(Movie) private readonly movieRepo: Repository<Movie>,
  ) {}

  async create(dto: CreateEpisodeDto, actor: { kind: 'user' | 'admin' }) {
    if (actor.kind !== 'admin') throw new ForbiddenException('Admin only');
    const movie = await this.movieRepo.findOne({ where: { movieId: dto.movieId } });
    if (!movie) throw new NotFoundException('Movie not found');
    const ep = this.episodeRepo.create({
      movie,
      title: dto.title,
      videoUrl: dto.videoUrl ?? null,
      duration: dto.duration ?? null,
      episodeNo: dto.episodeNo ?? null,
    });
    return this.episodeRepo.save(ep);
  }

  async update(id: number, dto: UpdateEpisodeDto, actor: { kind: 'user' | 'admin' }) {
    if (actor.kind !== 'admin') throw new ForbiddenException('Admin only');
    const ep = await this.episodeRepo.findOne({ where: { episodeId: id }, relations: { movie: true } });
    if (!ep) throw new NotFoundException('Episode not found');
    if (dto.title !== undefined) ep.title = dto.title;
    if (dto.videoUrl !== undefined) ep.videoUrl = dto.videoUrl ?? null;
    if (dto.duration !== undefined) ep.duration = dto.duration ?? null;
    if (dto.episodeNo !== undefined) ep.episodeNo = dto.episodeNo ?? null;
    return this.episodeRepo.save(ep);
  }

  async remove(id: number, actor: { kind: 'user' | 'admin' }) {
    if (actor.kind !== 'admin') throw new ForbiddenException('Admin only');
    await this.episodeRepo.softDelete({ episodeId: id });
  }
}


