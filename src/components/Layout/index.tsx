import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import {
  faPlus,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useContext, useMemo, useState } from 'react';

import Icon from '../../atoms/Icon';
import { FirebaseContext } from '../../context/FirebaseContext';
import { useMe } from '../../queries/me';
import Logo from '../Logo';
import SearchBookModal from '../SearchBookModal';
import UserAvatar from '../UserAvatar';

interface Props {
  className?: string;
  children: ReactNode;
}

const menuHeight = 56;

export default function Layout({ className, children }: Props) {
  const { pathname } = useRouter();
  const { data, isLoading } = useMe();
  const user = data?.user;

  const [isSelectBookModalOpen, setIsSelectBookModalOpen] = useState(false);

  const { logout } = useContext(FirebaseContext);

  const rightAdornment = useMemo(() => {
    if (isLoading) {
      return null;
    }

    if (user != null) {
      return (
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            variant="unstyled"
            icon={<UserAvatar user={user} />}
          />
          <MenuList>
            <NextLink href={`/profile/${user.id}`} passHref>
              <MenuItem
                as="a"
                icon={<Icon size={16} icon={faUser} />}
                position="relative"
              >
                내 프로필
              </MenuItem>
            </NextLink>
            <MenuItem
              icon={<Icon size={16} icon={faPlus} />}
              onClick={() => setIsSelectBookModalOpen(true)}
            >
              갈피 남기기
            </MenuItem>
            <MenuDivider />
            <MenuItem
              color="red.500"
              icon={<Icon size={16} icon={faSignOutAlt} />}
              onClick={logout}
            >
              로그아웃
            </MenuItem>
          </MenuList>
        </Menu>
      );
    }

    const loginPathname = '/login';

    if (pathname.startsWith(loginPathname)) {
      return null;
    }

    return (
      <NextLink href="/login">
        <LoginLink>로그인</LoginLink>
      </NextLink>
    );
  }, [isLoading, user, pathname, logout]);

  return (
    <Article className={className}>
      <Main>{children}</Main>
      <Right>
        <RightWrapper>
          <Logo height={32} />
          {rightAdornment}
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

const LoginLink = styled.a`
  cursor: pointer;
  display: block;
`;
