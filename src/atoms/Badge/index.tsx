import React from 'react';
import styled from '@emotion/styled';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Badge({ className, children }: Props) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

const Wrapper = styled.span`
  font-size: 0.5em;

  border: 1px solid black;
  border-radius: 2px;
  padding: 2px 6px;
`;
