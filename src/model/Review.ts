import { User } from './User';
import { Book } from './Book';
import { Revision } from './Revision';

export enum ReadingStatus {
  hasntStarted = 'hasntStarted',
  reading = 'reading',
  finishedReading = 'finishedReading',
}

export interface ReviewPayload {
  isPublic: boolean;
  readingStartedAt?: number;
  readingFinishedAt?: number;
}

export interface Review {
  id: string;

  readingStartedAt?: string;
  readingFinishedAt?: string;

  createdAt: string;
  lastModifiedAt: string;

  isPublic: boolean;

  user: User;
  book: Book;
  activeRevision?: Revision;
}
