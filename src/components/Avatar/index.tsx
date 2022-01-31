import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { faLaugh } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../model/User';
import Icon from '../../atoms/Icon';

interface Props {
  className?: string;
  user: User;
  title?: ReactNode;
  subtitle?: ReactNode;
}

export default function Avatar({ className, user, title, subtitle }: Props) {
  return (
    <Link href={`/profile/${user.id}`} passHref>
      <Wrapper className={className}>
        {user.profileImageUrl != null ? (
          <Image src={user.profileImageUrl} />
        ) : (
          <Icon size={24} icon={faLaugh} />
        )}
        {title != null || subtitle != null ? (
          <TextWrapper>
            {title != null ? <Title>{title}</Title> : null}
            {subtitle != null ? <Subtitle>{subtitle}</Subtitle> : null}
          </TextWrapper>
        ) : null}
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.a`
  display: inline-flex;
  align-items: center;
  position: relative;

  padding: 4px;

  border: 1px solid #fefefe;

  &:hover {
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
`;

const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  overflow: hidden;

  border: 1px solid #e2e2e2;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-left: 12px;
`;

const Title = styled.div``;

const Subtitle = styled.div`
  margin-top: 4px;

  font-size: 0.6rem;
`;
