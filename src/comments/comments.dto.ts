export interface CreateCommentDto {
  movieId: number;
  content: string;
}

export interface UpdateCommentDto {
  content?: string;
}


