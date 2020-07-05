import React from 'react';
import { User } from '../../model/User';
import styled from '@emotion/styled';
import Link from 'next/link';

interface Props {
  className?: string;
  user: User;
  subtitle?: React.ReactNode;
}

export default function Avatar({ className, user, subtitle }: Props) {
  return (
    <Link href={`/profile/${user.id}`} passHref>
      <Wrapper className={className}>
        {user.profileImageUrl != null ? (
          <Image src={user.profileImageUrl} />
        ) : null}
        <TextWrapper>
          <Title>{user.displayName || user.email}</Title>
          {subtitle != null ? <Subtitle>{subtitle}</Subtitle> : null}
        </TextWrapper>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.a`
  display: inline-flex;
  align-items: center;

  padding: 8px 12px;
  border-radius: 24px;
  transition: 0.2s background-color ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
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
