import { NextPage } from 'next';
import styled from '@emotion/styled';
import '@toast-ui/editor/dist/toastui-editor.css';

import Layout from '../../components/Layout';
import ScoreBadge from '../../components/ScoreBadge';
import CommonHeadElements from '../../components/CommonHeadElements';
import { Button } from '../../atoms';
import Icon from '../../atoms/Icon';
import Avatar from '../../components/Avatar';
// import { getAxiosInstance } from '../../utils/axios';
import ToastEditor from '../../components/Editor';

const WriteReview: NextPage = () => {
  // const axios = getAxiosInstance();

  return (
    <>
      <CommonHeadElements title="새 독후감 작성" />
      <Layout>
        <Title>새 글 작성</Title>
        <ToastEditor
          language="ko-KR"
          minHeight="600px"
          height="600px"
          hideModeSwitch
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol'],
            [
              // 'table', 'image',
              'link',
            ],
            ['code', 'codeblock'],
            ['scrollSync'],
          ]}
        />
        <Buttons>
          <AboutGalpiButton href="/">“갈피” 알아보기</AboutGalpiButton>
        </Buttons>
      </Layout>
    </>
  );
};

export default WriteReview;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 24px;
`;

const BookTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 8px;

  color: #292929;
`;

const BookTitle = styled.h2`
  ::before {
    content: '『';
    font-family: sans-serif;
  }

  ::after {
    content: '』';
    font-family: sans-serif;
  }
`;

const BookAuthor = styled.span`
  margin-left: 8px;
`;

const BookLinkIcon = styled(Icon)`
  cursor: pointer;
  margin-left: 8px;
`;

const Badges = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: auto;
`;

const StyledScoreBadge = styled(ScoreBadge)`
  margin-left: 8px;
`;

const StyledAvatar = styled(Avatar)`
  margin: 24px 0;
`;

const DateInfo = styled.time`
  display: flex;
  align-items: center;

  margin-top: 4px;

  font-size: 0.75rem;
  line-height: 1;
`;

const CoverImage = styled.img`
  border: 1px solid #e2e2e2;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 72px;
`;

const AboutGalpiButton = styled(Button)`
  flex: 1 1 50%;
`;
