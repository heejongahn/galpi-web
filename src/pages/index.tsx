import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';

import Layout from '../components/Layout';
import { Button } from '../atoms';
import Icon from '../atoms/Icon';
import useInterval from '../hooks/useInterval';
import useMedia from '../hooks/useMedia';
import MobileLanding from './_mobileLanding';

const screenshotNames = ['main', 'detail', 'search', 'write', 'login'];

export default function Index() {
  const [screenshotIndex, setScreenshotIndex] = useState(0);

  const intervalCallback = useCallback(() => {
    setScreenshotIndex(
      (previousIndex) => (previousIndex + 1) % screenshotNames.length
    );
  }, []);
  useInterval(intervalCallback, 3000);

  const breakpoint = useMedia();
  const isMobile = breakpoint === 'md';

  if (isMobile) {
    return <MobileLanding />;
  }

  return (
    <StyledLayout>
      <Wrapper>
        <Hero>
          <Title>
            갈피는 아름다운
            <br />
            독후감 관리 앱입니다.
          </Title>
          <Subtitle>
            앱스토어 또는 구글 플레이에서 내려받고
            <br />
            독서 생활의 갈피를 남겨보세요.
          </Subtitle>
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
        </Hero>
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
      </Wrapper>
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
  max-width: 1400px;
`;

const Wrapper = styled.section`
  padding: 0 48px;
  width: 100%;
  display: flex;
`;

const Hero = styled.section`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 4rem;
`;

const Subtitle = styled.h2`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: normal;
`;

const ButtonWrapper = styled.div`
  margin-top: 96px;

  display: flex;
  align-items: center;
`;

const StoreButton = styled(Button)`
  font-weight: bold;
  width: 300px;
  max-width: 100%;

  &:not(:last-child) {
    margin-right: 24px;
  }
`;

const StoreImage = styled(Icon)`
  margin-right: 12px;
`;

const ScreenshotWrapper = styled.div`
  margin-left: auto;
  width: 375px;

  position: relative;
`;

const Screenshot = styled.img<{ isActive: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;

  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: 0.5s opacity ease-in-out;
`;
