import React from 'react';
import { NextPage } from 'next';
import styled from '@emotion/styled';
import { parseISO, format } from 'date-fns';

import Layout from '../../components/Layout';
import { getReview } from '../../remotes';
import { Review } from '../../model/Review';
import ReadingStatusBadge from '../../components/ReadingStatusBadge';
import ScoreBadge from '../../components/ScoreBadge';
import { Button } from '../../atoms';

interface Props {
  review?: Review;
}

const ReviewDetail: NextPage<Props> = ({ review }) => {
  const [parsedCreatedAt, parsedLastModifiedAt] =
    review == null
      ? ['', '']
      : [review.createdAt, review.lastModifiedAt].map((dateString) =>
          format(parseISO(dateString), 'yyyy. M. d')
        );

  if (review == null) {
    return (
      <Layout>
        <h1>존재하지 않는 독후감입니다.</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header>
        <Meta>
          <Title>{review.title}</Title>
          <BookTitle>
            『{review.book.title}』 – {review.book.author}
          </BookTitle>
          <Badges>
            <ReadingStatusBadge
              readingStatus={review.readingStatus}
            ></ReadingStatusBadge>
            <StyledScoreBadge score={review.stars}></StyledScoreBadge>
          </Badges>
          <Author>{review.user.displayName || review.user.email}</Author>
          <DateInfos>
            <DateInfo>{parsedCreatedAt} 씀</DateInfo>
            <DateInfo>{parsedLastModifiedAt} 고침</DateInfo>
          </DateInfos>
        </Meta>
        {review.book.imageUri ? <img src={review.book.imageUri} /> : null}
      </Header>
      <Body>{review.body}</Body>
      <Buttons>
        <ShareButton onClick={() => alert(1)}>공유하기</ShareButton>
        <AboutGalpiButton href="/">“갈피” 알아보기</AboutGalpiButton>
      </Buttons>
    </Layout>
  );
};

ReviewDetail.getInitialProps = async (context) => {
  const { id } = context.query;
  if (id == null) {
    return {};
  }

  const parsedId = Array.isArray(id) ? id[0] : id;

  const { review } = await getReview({ id: parsedId });
  return { review };
};

export default ReviewDetail;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 8px;
`;

const BookTitle = styled.h2`
  margin-bottom: 8px;
`;

const Badges = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: auto;
`;

const StyledScoreBadge = styled(ScoreBadge)`
  margin-left: 8px;
`;

const Author = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
`;

const DateInfos = styled.div`
  display: flex;
  align-items: center;

  margin-top: 8px;

  font-size: 0.75rem;
  line-height: 1;
`;

const DateInfo = styled.time`
  position: relative;

  padding: 0 12px;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  &:not(:last-child) {
    border-right: 1px solid gray;
  }
`;

const Body = styled.section`
  margin-top: 64px;

  line-height: 1.7;
  white-space: pre-line;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 48px;
`;

const ShareButton = styled(Button)`
  flex: 1 1 50%;
  margin-right: 12px;
`;

const AboutGalpiButton = styled(Button)`
  flex: 1 1 50%;
`;
