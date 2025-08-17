import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
import type { CreateGenreDto, UpdateGenreDto } from './genres.dto';

@Injectable()
export class GenresService {
  constructor(@InjectRepository(Genre) private readonly genreRepo: Repository<Genre>) {}

  async findAll() {
    return this.genreRepo.find();
  }

  async create(dto: CreateGenreDto, actor: { kind: 'user' | 'admin' }) {
    if (actor.kind !== 'admin') throw new ForbiddenException('Admin only');
    const genre = this.genreRepo.create({ name: dto.name });
    return this.genreRepo.save(genre);
  }

  async update(id: number, dto: UpdateGenreDto, actor: { kind: 'user' | 'admin' }) {
    if (actor.kind !== 'admin') throw new ForbiddenException('Admin only');
    const genre = await this.genreRepo.findOne({ where: { genreId: id } });
    if (!genre) throw new NotFoundException('Genre not found');
    if (dto.name !== undefined) genre.name = dto.name;
    return this.genreRepo.save(genre);
  }
}


