import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { CommentsModule } from './comments/comments.module';
import { EpisodesModule } from './episodes/episodes.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Admin } from './admins/admin.entity';
import { User } from './users/user.entity';
import { Movie } from './movies/movie.entity';
import { Genre } from './genres/genre.entity';
import { Comment } from './comments/comment.entity';
import { Favorite } from './favorites/favorite.entity';
import { Episode } from './episodes/episode.entity';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME || 'mini_netflix',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      entities: [Admin, User, Movie, Genre, Comment, Favorite, Episode],
      autoLoadEntities: true,
      synchronize: false,
      logging: (process.env.DB_LOGGING || 'false') === 'true',
    }),
    AdminsModule,
    UsersModule,
    AuthModule,
    MoviesModule,
    GenresModule,
    CommentsModule,
    EpisodesModule,
    FavoritesModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
