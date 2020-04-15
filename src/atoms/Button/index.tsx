import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

type Props = {
  className?: string;
  children: React.ReactNode;
  // size: 'm';
} & ({ href: string } | { onClick: () => void });

export default function Button({ className, children, ...rest }: Props) {
  if ('href' in rest) {
    return (
      <Link href={rest.href} passHref>
        <AnchorWrapper className={className}>{children}</AnchorWrapper>
      </Link>
    );
  }

  return (
    <Wrapper className={className} onClick={rest.onClick}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  padding: 24px 48px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  border: 1px solid black;

  transition: 0.2s background-color ease-in-out, 0.2s color ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
`;

const AnchorWrapper = Wrapper.withComponent('a');
