import { Heading, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';

import CommonHeadElements from '../components/CommonHeadElements';
import Layout from '../components/Layout';
import { Media } from '../components/Media';
import MobileLanding from './_mobileLanding';

export default function Index() {
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
                <VStack spacing="24px" align="flex-start">
                  <Heading as="h1" size="2xl">
                    2023년 3월 부로
                    <br />
                    갈피 서비스가 종료되었습니다.
                  </Heading>
                  <Heading as="h2" fontWeight={400} size="lg">
                    찾아주셔서 감사합니다.
                  </Heading>
                </VStack>
              </Hero>
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
