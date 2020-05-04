import React from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

interface Props {
  className?: string;
  icon: FontAwesomeIconProps['icon'];
  onClick?: (e: React.MouseEvent) => void;
}

export default function Icon({ className, icon, onClick }: Props) {
  return (
    <StyledFontAwesomeIcon
      className={className}
      icon={icon}
      onClick={onClick}
    />
  );
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
`;
