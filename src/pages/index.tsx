import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';

import Layout from '../components/Layout';
import Icon from '../atoms/Icon';
import useInterval from '../hooks/useInterval';
import MobileLanding from './_mobileLanding';
import CommonHeadElements from '../components/CommonHeadElements';
import { Media } from '../components/Media';
import { Heading, VStack, Button, Link, HStack } from '@chakra-ui/react';

const screenshotNames = ['main', 'detail', 'search', 'write', 'login'];

export default function Index() {
  const [screenshotIndex, setScreenshotIndex] = useState(0);

  const intervalCallback = useCallback(() => {
    setScreenshotIndex(
      (previousIndex) => (previousIndex + 1) % screenshotNames.length
    );
  }, []);
  useInterval(intervalCallback, 3000);

  const title = '갈피';
  const description = '갈피는 아름다운 독후감 관리 앱입니다.';

  const headInfo = {
    title,
    description,
  };

  return (
    <>
      <CommonHeadElements {...headInfo} />
      <Media lessThan="desktop">
        {(className) => <MobileLanding className={className} />}
      </Media>
      <Media greaterThanOrEqual="desktop">
        {(className) => (
          <StyledLayout key="pc" className={className}>
            <Wrapper>
              <Hero>
                <VStack spacing="72px" align="flex-start">
                  <VStack spacing="24px" align="flex-start">
                    <Heading as="h1" size="2xl">
                      갈피는 아름다운
                      <br />
                      독후감 관리 앱입니다.
                    </Heading>
                    <Heading as="h2" fontWeight={400} size="lg">
                      앱스토어 또는 구글 플레이에서 내려받고
                      <br />
                      독서 생활의 갈피를 남겨보세요.
                    </Heading>
                  </VStack>
                  <ButtonWrapper spacing="24px" align="center">
                    <Link href="https://apps.apple.com/kr/app/%EA%B0%88%ED%94%BC/id1470817706">
                      <StoreButton size="lg" target="_blank" variant="outline">
                        <StoreImage icon={faApple}></StoreImage>
                        App Store
                      </StoreButton>
                    </Link>
                    <Link href="https://play.google.com/store/apps/details?id=name.ahnheejong.galpi">
                      <StoreButton size="lg" target="_blank" variant="outline">
                        <StoreImage icon={faGooglePlay}></StoreImage>
                        Google Play
                      </StoreButton>
                    </Link>
                  </ButtonWrapper>
                </VStack>
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
        )}
      </Media>
    </>
  );
}

const StyledLayout = styled(Layout)`
  max-width: 1200px;
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

const ButtonWrapper = styled(HStack)`
  display: flex;
  align-items: center;
`;

const StoreButton = styled(Button)`
  font-weight: bold;
  width: 300px;
  max-width: 100%;
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
