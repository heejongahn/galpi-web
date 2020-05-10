import React from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

interface Props {
  size?: number;
  className?: string;
  icon: FontAwesomeIconProps['icon'];
  onClick?: (e: React.MouseEvent) => void;
}

export default function Icon({ size = 24, className, icon, onClick }: Props) {
  return (
    <StyledFontAwesomeIcon
      iconSize={size}
      className={className}
      icon={icon}
      onClick={onClick}
    />
  );
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)<{ iconSize: number }>`
  font-size: ${(props) => props.iconSize}px;
  width: ${(props) => props.iconSize}px;
  height: ${(props) => props.iconSize}px;
`;
