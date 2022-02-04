import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { faLaugh } from '@fortawesome/free-solid-svg-icons';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';

import { User } from '../../model/User';
import Icon from '../../atoms/Icon';

interface Props {
  className?: string;
  user: User;
  title?: ReactNode;
  subtitle?: ReactNode;
}

export default function UserAvatar({
  className,
  user,
  title,
  subtitle,
}: Props) {
  return (
    <Wrapper className={className}>
      <ChakraAvatar
        size="sm"
        src={user.profileImageUrl}
        icon={<Icon size={16} icon={faLaugh} color="#fff" />}
      />
      {title != null || subtitle != null ? (
        <TextWrapper>
          {title != null ? <Title>{title}</Title> : null}
          {subtitle != null ? <Subtitle>{subtitle}</Subtitle> : null}
        </TextWrapper>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-left: 12px;
`;

const Title = styled.div``;

const Subtitle = styled.div`
  font-size: 0.8rem;
`;
