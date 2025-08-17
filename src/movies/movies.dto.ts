export interface MovieQueryDto {
  genreId?: number;
  ratingMin?: number;
  ratingMax?: number;
  q?: string;
  page?: number;
  limit?: number;
}

export interface CreateMovieDto {
  title: string;
  description?: string;
  releaseDate?: string;
  duration?: number;
  rating?: number;
  posterUrl?: string;
  videoUrl?: string;
  genreIds?: number[];
}

export interface UpdateMovieDto {
  title?: string;
  description?: string;
  releaseDate?: string;
  duration?: number;
  rating?: number;
  posterUrl?: string;
  videoUrl?: string;
  genreIds?: number[];
}


