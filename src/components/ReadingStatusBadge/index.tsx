import React, { useMemo } from 'react';
import { Review, ReadingStatus } from '../../model/Review';
import { Badge } from '../../atoms';

interface Props {
  readingStatus: Review['readingStatus'];
  className?: string;
}

export default function ReadingStatusBadge({
  readingStatus,
  className,
}: Props) {
  const { icon, label } = useMemo(() => {
    switch (readingStatus) {
      case ReadingStatus.hasntStarted:
        return { icon: 'shopping_cart', label: '읽기 전' };
      case ReadingStatus.reading:
        return { icon: 'remove_red_eye', label: '읽는 중' };
      case ReadingStatus.finishedReading:
        return { icon: 'done', label: '읽음' };
    }
  }, []);

  return (
    <Badge className={className} icon={icon}>
      {label}
    </Badge>
  );
}
