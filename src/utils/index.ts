import { ReadingStatus } from '../model/Review';

export function getLabelForReadingStatus(readingStatus: ReadingStatus) {
  switch (readingStatus) {
    case ReadingStatus.hasntStarted: {
      return '읽기 전';
    }
    case ReadingStatus.reading: {
      return '읽는 중';
    }
    case ReadingStatus.finishedReading: {
      return '읽음';
    }
  }
}

export function getDisplayInfoForScore(score: number) {
  switch (score) {
    case 0:
      return { icon: 'sentiment_very_dissatisfied', label: '최악이에요' };
    case 1:
      return { icon: 'sentiment_dissatisfied', label: '별로에요' };
    case 2:
      return { icon: 'sentiment_neutral', label: '보통이에요' };
    case 3:
      return { icon: 'sentiment_satisfied', label: '추천해요' };
    case 4:
      return { icon: 'sentiment_very_satisfied', label: '최고에요' };
    default:
      return { icon: 'sentiment_neutral', label: '보통이에요' };
  }
}
