import { useState, useCallback } from 'react';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import styled from '@emotion/styled';

import useInterval from '../hooks/useInterval';
import Logo from '../components/Logo';
import { Button } from '../atoms';
import Icon from '../atoms/Icon';

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
      <StyledLogo height={120}></StyledLogo>
      <Title>
        갈피는 아름다운
        <br />
        독후감 관리 앱입니다.
      </Title>
      <ButtonWrapper>
        <StoreButton
          href="https://apps.apple.com/kr/app/%EA%B0%88%ED%94%BC/id1470817706"
          target="_blank"
        >
          <StoreImage icon={faApple}></StoreImage>
          App Store
        </StoreButton>
        <StoreButton
          href="https://play.google.com/store/apps/details?id=name.ahnheejong.galpi"
          target="_blank"
        >
          <StoreImage icon={faGooglePlay}></StoreImage>
          Google Play
        </StoreButton>
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

  position: absolute;
  top: 0;
  left: 0;
`;

const Screenshot = styled.img<{ isActive: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;

  opacity: ${({ isActive }) => (isActive ? 0.2 : 0)};
  transition: 0.5s opacity ease-in-out;
`;

const StyledLogo = styled(Logo)`
  z-index: 1;
`;

const Title = styled.h1`
  z-index: 1;

  font-size: 2rem;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  z-index: 1;

  margin-top: 48px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoreButton = styled(Button)`
  font-weight: bold;
  width: 100%;
  background-color: white;

  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const StoreImage = styled(Icon)`
  margin-right: 12px;
`;
