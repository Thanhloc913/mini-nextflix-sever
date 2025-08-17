export interface CreateEpisodeDto {
  movieId: number;
  title: string;
  videoUrl?: string;
  duration?: number;
  episodeNo?: number;
}

export interface UpdateEpisodeDto {
  title?: string;
  videoUrl?: string | null;
  duration?: number | null;
  episodeNo?: number | null;
}


