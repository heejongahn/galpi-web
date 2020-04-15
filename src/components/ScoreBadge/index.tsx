import React, { useMemo } from 'react';
import { Review } from '../../model/Review';
import { getDisplayInfoForScore } from '../../utils';
import { Badge } from '../../atoms';

interface Props {
  score: Review['stars'];
  className?: string;
}

export default function ScoreBadge({ score, className }: Props) {
  const { icon, label } = useMemo(() => {
    return getDisplayInfoForScore(score);
  }, []);

  return (
    <Badge className={className} icon={icon}>
      {label}
    </Badge>
  );
}
