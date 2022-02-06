import { Badge, Text, HStack } from '@chakra-ui/react';
import {
  faShoppingBasket,
  faSpinner,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';

import Icon from '../../atoms/Icon';
import { ReadingStatus } from '../../model/Review';
import { Revision } from '../../model/Revision';

interface Props {
  readingStatus: Revision['readingStatus'];
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
      default:
        return { icon: faCheck, label: '읽음' } as const;
    }
  }, [readingStatus]);

  return (
    <Badge className={className}>
      <HStack align="center" spacing="4px">
        <Text>{label}</Text>
        <Icon icon={icon} size={12} />
      </HStack>
    </Badge>
  );
}
