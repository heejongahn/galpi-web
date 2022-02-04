import { NextPage } from 'next';
import styled from '@emotion/styled';

import { Review } from '../../model/Review';
import { parseISO, format } from 'date-fns';
import ReadingStatusBadge from '../ReadingStatusBadge';
import ScoreBadge from '../ScoreBadge';
import Link from 'next/link';
import {
  Center,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';

interface Props {
  readReviews: Review[];
  unreadReviews: Review[];
}

const ReviewLists: NextPage<Props> = ({ readReviews, unreadReviews }) => {
  const readReviewSection =
    readReviews.length > 0 ? (
      <Reviews align="stretch" spacing="12px" as="ol">
        {readReviews.map((review) => {
          const {
            book,
            title,
            createdAt,
            lastModifiedAt,
            readingStatus,
            stars,
          } = review;

          const [parsedCreatedAt, parsedLastModifiedAt] = [
            createdAt,
            lastModifiedAt,
          ].map((dateString) => format(parseISO(dateString), 'yyyy. M. d'));

          return (
            <li>
              <Link passHref href={`/review/${review.id}`}>
                <ReviewWrapper>
                  <Title>{title || '(제목 없음)'}</Title>
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
            </li>
          );
        })}
      </Reviews>
    ) : (
      <div>작성한 독후감이 없습니다.</div>
    );

  const unreadReviewSection =
    unreadReviews.length > 0 ? (
      <Reviews align="stretch" spacing="12px" as="ol">
        {unreadReviews.map((review) => {
          const {
            book,
            title,
            createdAt,
            lastModifiedAt,
            readingStatus,
            stars,
          } = review;

          const parsedCreatedAt = format(parseISO(createdAt), 'yyyy. M. d');

          return (
            <li>
              <Link passHref href={`/review/${review.id}`}>
                <ReviewWrapper>
                  <BookTitleWrapper>
                    <BookTitle>{book.title}</BookTitle>
                  </BookTitleWrapper>
                  <DateInfo>{parsedCreatedAt} 추가됨</DateInfo>
                </ReviewWrapper>
              </Link>
            </li>
          );
        })}
      </Reviews>
    ) : (
      <div>저장한 책이 없습니다.</div>
    );

  return (
    <Tabs css={{ margin: '24px 0' }} colorScheme="black">
      <TabList>
        <Tab>독후감</Tab>
        <Tab>저장한 책</Tab>
      </TabList>
      <TabPanels>
        <TabPanel padding="0">
          <TabPanelContent>{readReviewSection}</TabPanelContent>
        </TabPanel>
        <TabPanel padding="0">
          <TabPanelContent>{unreadReviewSection}</TabPanelContent>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ReviewLists;

const Reviews = styled(VStack)`
  margin: 0;
  padding: 0;

  width: 100%;
`;

const ReviewWrapper = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  border-radius: 8px;
  padding: 12px 12px;
  margin: 0 -12px;
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

const TabPanelContent = styled(Flex)`
  width: 100%;

  padding: 24px 0;
`;
