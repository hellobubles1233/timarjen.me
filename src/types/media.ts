export type MediaType = 'movie' | 'tv' | 'book';

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  rating: number;
  watchCount?: number;
  readCount?: number;
  comment: string;
  date: string;
  imageUrl?: string;
  creator?: string; // author for books, director for movies
  year?: number;
}

export interface MediaStats {
  totalMovies: number;
  totalTvShows: number;
  totalBooks: number;
  averageRating: number;
  totalWatched: number;
  totalRead: number;
}