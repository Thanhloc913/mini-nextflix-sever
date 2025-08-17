import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './episode.entity';
import { Movie } from '../movies/movie.entity';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Movie])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
  exports: [EpisodesService],
})
export class EpisodesModule {}


