import React, { useMemo } from 'react';
import { Review } from '../../model/Review';
import { Badge } from '../../atoms';
import {
  faSkull,
  faPoo,
  faBalanceScale,
  faHeart,
  faKissWinkHeart,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  score: Review['stars'];
  className?: string;
}

export default function ScoreBadge({ score, className }: Props) {
  const { icon, label } = useMemo(() => {
    switch (score) {
      case 0:
        return { icon: faSkull, label: '최악이에요' } as const;
      case 1:
        return { icon: faPoo, label: '별로에요' } as const;
      case 2:
        return { icon: faBalanceScale, label: '보통이에요' } as const;
      case 3:
        return { icon: faHeart, label: '추천해요' } as const;
      case 4:
        return { icon: faKissWinkHeart, label: '최고에요' } as const;
      default:
        return { icon: faBalanceScale, label: '보통이에요' } as const;
    }
  }, [score]);

  return (
    <Badge className={className} icon={icon}>
      {label}
    </Badge>
  );
}
