import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Movie } from '../movies/movie.entity';
import { User } from '../users/user.entity';
import type { CreateCommentDto, UpdateCommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Movie) private readonly movieRepo: Repository<Movie>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async listByMovie(movieId: number) {
    return this.commentRepo.find({
      where: { movie: { movieId } },
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });
  }

  async create(dto: CreateCommentDto, actor: { kind: 'user' | 'admin'; sub: string }) {
    if (!actor || actor.kind !== 'user') throw new ForbiddenException('User only');
    const movie = await this.movieRepo.findOne({ where: { movieId: dto.movieId } });
    if (!movie) throw new NotFoundException('Movie not found');
    const user = await this.userRepo.findOne({ where: { userId: actor.sub } });
    if (!user) throw new NotFoundException('User not found');
    const comment = this.commentRepo.create({ content: dto.content, movie, user });
    return this.commentRepo.save(comment);
  }

  async remove(id: string, actor: { kind: 'user' | 'admin'; sub: string }) {
    const comment = await this.commentRepo.findOne({ where: { commentId: id }, relations: { user: true } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (actor.kind !== 'admin' && comment.user.userId !== actor.sub) {
      throw new ForbiddenException('Not allowed');
    }
    await this.commentRepo.softDelete({ commentId: id });
  }
}


