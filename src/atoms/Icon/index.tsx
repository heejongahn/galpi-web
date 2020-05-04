import React from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

interface Props {
  className?: string;
  icon: FontAwesomeIconProps['icon'];
}

export default function Icon({ className, icon }: Props) {
  return <StyledFontAwesomeIcon className={className} icon={icon} />;
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
`;
