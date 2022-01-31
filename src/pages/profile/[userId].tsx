import { NextPage, GetServerSideProps } from 'next';
import styled from '@emotion/styled';

import Layout from '../../components/Layout';
import { getProfile, getReviewsByUser } from '../../remotes';
import { Review } from '../../model/Review';
import CommonHeadElements from '../../components/CommonHeadElements';
import { User } from '../../model/User';
import Avatar from '../../components/Avatar';
import { parseISO, format } from 'date-fns';
import ReadingStatusBadge from '../../components/ReadingStatusBadge';
import ScoreBadge from '../../components/ScoreBadge';
import Link from 'next/link';
import { getAxiosInstance } from '../../utils/axios';

interface Props {
  user?: User;
  reviews: Review[];
}

const Profile: NextPage<Props> = ({ user, reviews }) => {
  if (user == null) {
    return (
      <>
        <CommonHeadElements
          title="갈피"
          description="갈피는 아름다운 독후감 작성 앱입니다."
        />
        <Layout>
          <h1>존재하지 않는 사용자입니다.</h1>
        </Layout>
      </>
    );
  }

  const title = `${user.displayName} @ 갈피`;
  const displayName = user.displayName || user.email;
  const description = `${displayName}님의 프로필`;

  return (
    <>
      <CommonHeadElements title={title} description={description} />
      <Layout>
        <Avatar
          user={user}
          title={user.displayName ?? user.email}
          subtitle="님의 공개 독후감"
        />
        <Reviews>
          {reviews.map((review) => {
            const {
              book,
              title,
              createdAt,
              lastModifiedAt,
              readingStatus,
              stars,
            } = review;

            const [parsedCreatedAt, parsedLastModifiedAt] =
              review == null
                ? ['', '']
                : [createdAt, lastModifiedAt].map((dateString) =>
                    format(parseISO(dateString), 'yyyy. M. d')
                  );

            return (
              <Link passHref href={`/review/${review.id}`}>
                <ReviewWrapper>
                  <Title>{title}</Title>
                  <BookTitleWrapper>
                    <BookTitle>{book.title}</BookTitle>
                    <BookAuthor>{book.author}</BookAuthor>
                  </BookTitleWrapper>
                  <DateInfo>
                    {parsedCreatedAt} 씀 · {parsedLastModifiedAt} 고침
                  </DateInfo>
                  <Badges>
                    <ReadingStatusBadge
                      readingStatus={readingStatus}
                    ></ReadingStatusBadge>
                    <StyledScoreBadge score={stars}></StyledScoreBadge>
                  </Badges>
                </ReviewWrapper>
              </Link>
            );
          })}
        </Reviews>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  user?: User;
  reviews: Review[];
}> = async (context) => {
  const { query, req } = context;
  const { userId } = query;

  if (userId == null) {
    return { props: { reviews: [] } };
  }

  const parsedUserId = Array.isArray(userId) ? userId[0] : userId;

  const axiosInstance = getAxiosInstance(req);

  try {
    const [{ user }, { reviews }] = await Promise.all([
      getProfile(axiosInstance)({ userId: parsedUserId }),
      getReviewsByUser(axiosInstance)({ userId: parsedUserId }),
    ]);
    return {
      props: {
        user,
        reviews,
      },
    };
  } catch (e) {
    return { props: { reviews: [] } };
  }
};

export default Profile;

const Reviews = styled.ul`
  margin: 0;
  padding: 0;
`;

const ReviewWrapper = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  border-radius: 8px;
  padding: 24px;
  margin: 24px -24px;
  transition: 0.2s background-color ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.strong`
  font-size: 2em;
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

const Badges = styled.div`
  display: flex;
  align-items: center;

  margin-top: 12px;
`;

const StyledScoreBadge = styled(ScoreBadge)`
  margin-left: 8px;
`;

const DateInfo = styled.time`
  display: flex;
  align-items: center;

  margin-top: 4px;

  font-size: 0.75rem;
  line-height: 1;
`;
