import React from 'react';
import styled from '@emotion/styled';
import Icon from '../Icon';

interface Props {
  className?: string;
  icon?: string;
  children: React.ReactNode;
}

export default function Badge({ className, icon, children }: Props) {
  return (
    <Wrapper className={className}>
      {icon != null ? <StyledIcon>{icon}</StyledIcon> : null}
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.span`
  display: flex;
  align-items: center;

  font-size: 0.75rem;
  font-weight: 700;

  border: 1px solid black;
  border-radius: 2px;
  padding: 2px 6px;
`;

const StyledIcon = styled(Icon)`
  font-size: 0.75rem;
  margin-right: 4px;
`;
