import { ReactNode, useMemo } from 'react';
import styled from '@emotion/styled';

import Logo from '../Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useMe from '../../queries/useMe';
import UserAvatar from '../UserAvatar';

interface Props {
  className?: string;
  children: ReactNode;
}

const menuHeight = 56;

export default function Layout({ className, children }: Props) {
  const { pathname } = useRouter();
  const { data } = useMe();
  const user = data?.user;

  const rightAdornment = useMemo(() => {
    if (user != null) {
      return <UserAvatar user={user} />;
    }

    const loginPathname = '/login';

    if (pathname.startsWith(loginPathname)) {
      return null;
    }

    return (
      <Link href="/login">
        <LoginLink>로그인</LoginLink>
      </Link>
    );
  }, [user, pathname]);

  return (
    <Article className={className}>
      <Main>{children}</Main>
      <Menu>
        <MenuWrapper>
          <Logo height={32} />
          {rightAdornment}
        </MenuWrapper>
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
  justify-content: center;
  border-bottom: 0.5px solid #0e0e0e;
  background-color: rgba(255, 255, 255, 0.8);
`;

const MenuWrapper = styled.div`
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

const LoginLink = styled.a`
  cursor: pointer;
  display: block;
`;
