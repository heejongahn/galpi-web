import {
  Heading,
  VStack,
  Text,
  HStack,
  Button,
  Link,
  IconButton,
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import {
  faEdit,
  faExternalLinkAlt,
  faList,
  faSearchPlus,
} from '@fortawesome/free-solid-svg-icons';
import { parseISO, format } from 'date-fns';
import { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';

import Icon from '../../../atoms/Icon';
import CommonHeadElements from '../../../components/CommonHeadElements';
import Layout from '../../../components/Layout';
import MarkdownContent from '../../../components/MarkdownContent';
import ReadingStatusBadge from '../../../components/ReadingStatusBadge';
import ScoreBadge from '../../../components/ScoreBadge';
import UserAvatar from '../../../components/UserAvatar';
import useMedia from '../../../hooks/useMedia';
import { Review } from '../../../model/Review';
import { useIsMe } from '../../../queries/me';
import { getReview } from '../../../remotes';
import { getAxiosInstance } from '../../../utils/axios';

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

  const openBookDetailPage = () => {
    window.open(review?.book.linkUri, '_blank');
  };

  const isWrittenByMe = useIsMe(review?.user.id);

  if (review == null) {
    return (
      <>
        <CommonHeadElements
          title="갈피"
          description="갈피는 아름다운 독후감 작성 앱입니다."
        />
        <Layout>
          <h1>존재하지 않는 독후감입니다.</h1>
        </Layout>
      </>
    );
  }

  const reviewTitle = review.activeRevision?.title ?? '(제목 없음)';

  const title = `${reviewTitle} – 갈피`;
  const displayName = review.user.displayName || review.user.email;
  const description = `${displayName}님의 『${review.book.title}』 독후감`;

  return (
    <>
      <CommonHeadElements title={title} description={description} />
      <Layout>
        <VStack align="stretch" spacing="48px">
          <Header>
            <VStack align="stretch" spacing="16px" css={{ flex: '1 1 auto' }}>
              <Heading as="h1">{reviewTitle}</Heading>
              <BookTitleWrapper>
                <BookTitle>{review.book.title}</BookTitle>
                <BookAuthor>{review.book.author}</BookAuthor>
                <BookLinkIcon
                  onClick={openBookDetailPage}
                  icon={faExternalLinkAlt}
                  size={12}
                />
              </BookTitleWrapper>
              <HStack align="center" justify="space-between">
                <UserAvatar
                  user={review.user}
                  title={review.user.displayName ?? review.user.email}
                  subtitle={
                    <DateInfo>
                      {parsedCreatedAt} 씀 · {parsedLastModifiedAt} 고침
                    </DateInfo>
                  }
                />
                <HStack spacing="12px" align="center">
                  <Tooltip hasArrow label="작성자의 모든 글 보기">
                    <Flex>
                      <NextLink href={`/profile/${review.user.id}`} passHref>
                        <IconButton
                          variant="ghost"
                          aria-label="작성자의 모든 글 보기"
                          as="a"
                          size="sm"
                          icon={<Icon icon={faSearchPlus} size={16} />}
                        />
                      </NextLink>
                    </Flex>
                  </Tooltip>
                  {isWrittenByMe ? (
                    <>
                      <Tooltip hasArrow label="수정하기">
                        <Flex>
                          <NextLink href={`/review/${review.id}/edit`} passHref>
                            <IconButton
                              variant="ghost"
                              aria-label="수정하기"
                              as="a"
                              size="sm"
                              icon={<Icon icon={faEdit} size={16} />}
                            />
                          </NextLink>
                        </Flex>
                      </Tooltip>
                    </>
                  ) : null}
                </HStack>
              </HStack>
              {review.activeRevision != null ? (
                <Badges>
                  <ReadingStatusBadge
                    readingStatus={review.activeRevision.readingStatus}
                  />
                  <StyledScoreBadge score={review.activeRevision.stars} />
                </Badges>
              ) : null}
            </VStack>
            {review.book.imageUri && breakpoint !== 'md' ? (
              <CoverImage
                src={review.book.imageUri}
                onClick={openBookDetailPage}
              />
            ) : null}
          </Header>
          {review.activeRevision != null &&
          review.activeRevision.body !== '' ? (
            <MarkdownContent data={review.activeRevision.body} />
          ) : (
            <Text>(내용이 없습니다.)</Text>
          )}
        </VStack>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;
  if (id == null) {
    return { props: { review: undefined } };
  }

  const axiosInstance = getAxiosInstance(context.req);
  const parsedId = Array.isArray(id) ? id[0] : id;

  try {
    const { review } = await getReview(axiosInstance)({ id: parsedId });
    return { props: { review } };
  } catch (e) {
    console.log(e);
    return { props: { review: undefined } };
  }
};

export default ReviewDetail;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
