import React, { useCallback } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import { parseISO, format } from 'date-fns';

import Layout from '../../components/Layout';
import { getReview } from '../../remotes';
import { Review } from '../../model/Review';
import ReadingStatusBadge from '../../components/ReadingStatusBadge';
import ScoreBadge from '../../components/ScoreBadge';
import { Button } from '../../atoms';
import CommonHeadElements from '../../components/CommonHeadElements';
import useMedia from '../../hooks/useMedia';
import Icon from '../../atoms/Icon';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

interface Props {
  review?: Review;
}

const ReviewDetail: NextPage<Props> = ({ review }) => {
  const breakpoint = useMedia();

  const [parsedCreatedAt, parsedLastModifiedAt] =
    review == null
      ? ['', '']
      : [review.createdAt, review.lastModifiedAt].map((dateString) =>
          format(parseISO(dateString), 'yyyy. M. d')
        );

  const openBookDetailPage = useCallback(() => {
    window.open(review?.book.linkUri, '_blank');
  }, []);

  if (review == null) {
    return (
      <Layout>
        <h1>존재하지 않는 독후감입니다.</h1>
      </Layout>
    );
  }

  const title = `${review.title} – 갈피`;
  const displayName = review.user.displayName || review.user.email;
  const description = `${displayName}님의 『${review.book.title}』 독후감`;

  return (
    <>
      <Head>
        <CommonHeadElements title={title} description={description} />
      </Head>
      <Layout>
        <Header>
          <Meta>
            <Title>{review.title}</Title>
            <BookTitleWrapper>
              <BookTitle>{review.book.title}</BookTitle>
              <BookAuthor>{review.book.author}</BookAuthor>
              <BookLinkIcon
                onClick={openBookDetailPage}
                icon={faExternalLinkAlt}
              />
            </BookTitleWrapper>
            <AuthorWrapper>
              {review.user.profileImageUrl != null ? (
                <Avatar src={review.user.profileImageUrl} />
              ) : null}
              <NameAndDate>
                <Name>{displayName}</Name>
                <DateInfo>
                  {parsedCreatedAt} 씀 · {parsedLastModifiedAt} 고침
                </DateInfo>
              </NameAndDate>
            </AuthorWrapper>
            <Badges>
              <ReadingStatusBadge
                readingStatus={review.readingStatus}
              ></ReadingStatusBadge>
              <StyledScoreBadge score={review.stars}></StyledScoreBadge>
            </Badges>
          </Meta>
          {review.book.imageUri && breakpoint !== 'md' ? (
            <CoverImage
              src={review.book.imageUri}
              onClick={openBookDetailPage}
            />
          ) : null}
        </Header>
        <Body>{review.body}</Body>
        <Buttons>
          <AboutGalpiButton href="/">“갈피” 알아보기</AboutGalpiButton>
        </Buttons>
      </Layout>
    </>
  );
};

ReviewDetail.getInitialProps = async (context) => {
  const { id } = context.query;
  if (id == null) {
    return { review: undefined };
  }

  const parsedId = Array.isArray(id) ? id[0] : id;

  try {
    const { review } = await getReview({ id: parsedId });
    return { review };
  } catch (e) {
    console.log(e);
    return { review: undefined };
  }
};

export default ReviewDetail;

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
  font-size: 3rem;
  margin-bottom: 8px;
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
  font-size: 12px;
`;

const Badges = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: auto;
`;

const StyledScoreBadge = styled(ScoreBadge)`
  margin-left: 8px;
`;

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 0;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  overflow: hidden;

  border: 1px solid #e2e2e2;

  margin-right: 12px;
`;

const NameAndDate = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
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

const Body = styled.section`
  margin-top: 64px;

  line-height: 1.7;
  white-space: pre-line;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 72px;
`;

const AboutGalpiButton = styled(Button)`
  flex: 1 1 50%;
`;
