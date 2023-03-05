import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';

import Logo from '../Logo';
import SearchBookModal from '../SearchBookModal';

interface Props {
  className?: string;
  children: ReactNode;
}

const menuHeight = 56;

export default function Layout({ className, children }: Props) {
  const [isSelectBookModalOpen, setIsSelectBookModalOpen] = useState(false);

  return (
    <Article className={className}>
      <Main>{children}</Main>
      <Right>
        <RightWrapper>
          <Logo height={32} />
        </RightWrapper>
      </Right>
      <SearchBookModal
        isOpen={isSelectBookModalOpen}
        onClose={() => {
          setIsSelectBookModalOpen(false);
        }}
      />
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

const Right = styled.menu`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: ${menuHeight}px;
  margin: 0;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.5px solid #0e0e0e;
  background-color: rgba(255, 255, 255, 0.8);
`;

const RightWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Main = styled.main`
  width: 100%;
  margin-top: ${menuHeight}px;
  padding: 32px 32px 120px;
`;
