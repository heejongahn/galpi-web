import { useState, useCallback } from 'react';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import styled from '@emotion/styled';

import useInterval from '../hooks/useInterval';
import Logo from '../components/Logo';
import Icon from '../atoms/Icon';
import { Heading, Button, Link, VStack } from '@chakra-ui/react';

const screenshotNames = ['main', 'detail', 'search', 'write', 'login'];

interface Props {
  className?: string;
}

export default function MobileLanding({ className }: Props) {
  const [screenshotIndex, setScreenshotIndex] = useState(0);

  const intervalCallback = useCallback(() => {
    setScreenshotIndex(
      (previousIndex) => (previousIndex + 1) % screenshotNames.length
    );
  }, []);
  useInterval(intervalCallback, 3000);

  return (
    <Wrapper key="mobile" className={className}>
      <ScreenshotWrapper>
        {screenshotNames.map((screenshotName, index) => (
          <Screenshot
            key={screenshotName}
            isActive={index === screenshotIndex}
            src={`/screenshots/${screenshotName}.png`}
            alt="갈피 스크린샷"
          ></Screenshot>
        ))}
      </ScreenshotWrapper>
      <StyledLogo height={120} />
      <Heading as="h1" fontWeight={700} textAlign="center">
        갈피는 아름다운
        <br />
        독후감 관리 앱입니다.
      </Heading>
      <ButtonWrapper align="stretch" spacing="24px">
        <Link href="https://apps.apple.com/kr/app/%EA%B0%88%ED%94%BC/id1470817706">
          <StoreButton target="_blank" variant="outline" size="lg">
            <StoreImage icon={faApple}></StoreImage>
            App Store
          </StoreButton>
        </Link>
        <Link href="https://play.google.com/store/apps/details?id=name.ahnheejong.galpi">
          <StoreButton target="_blank" variant="outline" size="lg">
            <StoreImage icon={faGooglePlay}></StoreImage>
            Google Play
          </StoreButton>
        </Link>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 24px;
`;

const ScreenshotWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
`;

const Screenshot = styled.img<{ isActive: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;

  opacity: ${({ isActive }) => (isActive ? 0.2 : 0)};
  transition: 0.5s opacity ease-in-out;
`;

const StyledLogo = styled(Logo)`
  z-index: 1;
`;

const ButtonWrapper = styled(VStack)`
  z-index: 1;

  margin-top: 48px;
`;

const StoreButton = styled(Button)`
  font-weight: bold;
  width: 100%;
  background-color: white;
`;

const StoreImage = styled(Icon)`
  margin-right: 12px;
`;
