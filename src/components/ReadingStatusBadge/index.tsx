import React, { useMemo } from 'react';
import { Review, ReadingStatus } from '../../model/Review';
import { Badge } from '../../atoms';
import {
  faShoppingBasket,
  faSpinner,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

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
        return { icon: faShoppingBasket, label: '읽기 전' } as const;
      case ReadingStatus.reading:
        return { icon: faSpinner, label: '읽는 중' } as const;
      case ReadingStatus.finishedReading:
        return { icon: faCheck, label: '읽음' } as const;
    }
  }, []);

  return (
    <Badge className={className} icon={icon}>
      {label}
    </Badge>
  );
}
