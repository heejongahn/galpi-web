import { Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState, useCallback } from 'react';

import Logo from '../components/Logo';
import useInterval from '../hooks/useInterval';

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
        2023년 3월 부로 갈피 서비스가 종료되었습니다. 찾아주셔서 감사합니다.
      </Heading>
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
