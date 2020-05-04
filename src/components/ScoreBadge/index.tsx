import React, { useMemo } from 'react';
import { Review } from '../../model/Review';
import { Badge } from '../../atoms';

interface Props {
  score: Review['stars'];
  className?: string;
}

export default function ScoreBadge({ score, className }: Props) {
  const { icon, label } = useMemo(() => {
    switch (score) {
      case 0:
        return { icon: 'clear', label: '최악이에요' };
      case 1:
        return { icon: 'thumb_down', label: '별로에요' };
      case 2:
        return { icon: 'thumbs_up_down', label: '보통이에요' };
      case 3:
        return { icon: 'thumb_up', label: '추천해요' };
      case 4:
        return { icon: 'favorite', label: '최고에요' };
      default:
        return { icon: 'thumbs_up_down', label: '보통이에요' };
    }
  }, [score]);

  return (
    <Badge className={className} icon={icon}>
      {label}
    </Badge>
  );
}
