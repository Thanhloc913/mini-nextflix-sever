import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
import { Movie } from '../movies/movie.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private readonly favRepo: Repository<Favorite>,
    @InjectRepository(Movie) private readonly movieRepo: Repository<Movie>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async listMine(actor: { kind: 'user' | 'admin'; sub: string }) {
    if (!actor || actor.kind !== 'user') throw new ForbiddenException('User only');
    return this.favRepo.find({ where: { user: { userId: actor.sub } }, relations: { movie: true } });
  }

  async add(movieId: number, actor: { kind: 'user' | 'admin'; sub: string }) {
    if (!actor || actor.kind !== 'user') throw new ForbiddenException('User only');
    const movie = await this.movieRepo.findOne({ where: { movieId } });
    if (!movie) throw new NotFoundException('Movie not found');
    const user = await this.userRepo.findOne({ where: { userId: actor.sub } });
    const exists = await this.favRepo.findOne({ where: { user: { userId: actor.sub }, movie: { movieId } } });
    if (exists) return exists;
    const fav = this.favRepo.create({ user: user!, movie });
    return this.favRepo.save(fav);
  }

  async remove(movieId: number, actor: { kind: 'user' | 'admin'; sub: string }) {
    if (!actor || actor.kind !== 'user') throw new ForbiddenException('User only');
    const fav = await this.favRepo.findOne({ where: { user: { userId: actor.sub }, movie: { movieId } } });
    if (!fav) return;
    await this.favRepo.remove(fav);
  }
}


