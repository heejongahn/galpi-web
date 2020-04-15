import React, { useMemo } from 'react';
import { Review } from '../../model/Review';
import { getLabelForReadingStatus } from '../../utils';
import { Badge } from '../../atoms';

interface Props {
  readingStatus: Review['readingStatus'];
  className?: string;
}

export default function ReadingStatusBadge({
  readingStatus,
  className,
}: Props) {
  const label = useMemo(() => {
    return getLabelForReadingStatus(readingStatus);
  }, []);

  return <Badge className={className}>{label}</Badge>;
}
