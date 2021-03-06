import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

import Logo from '../Logo';

interface Props {
  className?: string;
  children: ReactNode;
}

const menuHeight = 56;

export default function Layout({ className, children }: Props) {
  return (
    <Article className={className}>
      <Main>{children}</Main>
      <Menu>
        <Logo height={32} />
      </Menu>
    </Article>
  );
}

const Article = styled.article`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  height: 100%;

  background-color: white;
`;

const Menu = styled.menu`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: ${menuHeight}px;
  margin: 0;
  padding: 0 24px;

  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #0e0e0e;
  background-color: rgba(255, 255, 255, 0.8);
`;

const Main = styled.main`
  width: 100%;
  margin-top: ${menuHeight}px;
  padding: 32px 32px 120px;
`;
