import { Review } from './Review';

enum ReadingStatus {
  hasntStarted = 'hasntStarted',
  reading = 'reading',
  finishedReading = 'finishedReading',
}

export interface RevisionPayload {
  stars: number;
  title: string;
  body: string;
  readingStatus: ReadingStatus;
}

export interface Revision {
  id: string;

  stars: number;
  title: string;
  body: string;
  readingStatus: ReadingStatus;

  review: Review;
}
