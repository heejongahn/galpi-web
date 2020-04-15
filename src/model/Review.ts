import { User } from './User';
import { Book } from './Book';

enum ReadingStatus {
  hasntStarted = 'hasntStarted',
  reading = 'reading',
  finishedReading = 'finishedReading',
}

export interface Review {
  id: string;

  stars: number;

  title: string;

  body: string;

  readingStatus: string;

  readingStartedAt?: string;

  readingFinishedAt?: string;

  createdAt: string;

  lastModifiedAt: string;

  isPublic: boolean;
  user: User;
  book: Book;
}
