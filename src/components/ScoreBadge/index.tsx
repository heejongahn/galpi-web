import { HStack, Badge, Text } from '@chakra-ui/react';
import {
  faSkull,
  faPoo,
  faBalanceScale,
  faHeart,
  faKissWinkHeart,
} from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';

import Icon from '../../atoms/Icon';
import { Review } from '../../model/Review';


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
    <Badge className={className}>
      <HStack align="center" spacing="4px">
        <Text>{label}</Text>
        <Icon icon={icon} size={12} />
      </HStack>
    </Badge>
  );
}
