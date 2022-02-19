import { Button, HStack } from '@chakra-ui/react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react';

import Icon from '../../atoms/Icon';
import CommonHeadElements from '../../components/CommonHeadElements';
import Layout from '../../components/Layout';
import ReviewLists from '../../components/ReviewLists';
import SearchBookModal from '../../components/SearchBookModal';
import UserAvatar from '../../components/UserAvatar';
import { Review } from '../../model/Review';
import { User } from '../../model/User';
import { useIsMe } from '../../queries/me';
import { getProfile, getReviewsByUser } from '../../remotes';
import { getAxiosInstance } from '../../utils/axios';

interface Props {
  user?: User;
  readReviews: Review[];
  unreadReviews: Review[];
}

const Profile: NextPage<Props> = ({ user, readReviews, unreadReviews }) => {
  const isMe = useIsMe(user?.id);
  const [isSelectBookModalOpen, setIsSelectBookModalOpen] = useState(false);

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
        <HStack align="center" justify="space-between">
          <UserAvatar
            user={user}
            title={user.displayName ?? user.email}
            subtitle="님의 독후감"
          />
          {isMe ? (
            <Button
              leftIcon={<Icon size={16} icon={faPlus} />}
              onClick={() => setIsSelectBookModalOpen(true)}
            >
              갈피 남기기
            </Button>
          ) : null}
        </HStack>
        <ReviewLists
          isMe={isMe}
          readReviews={readReviews}
          unreadReviews={unreadReviews}
        />
        <SearchBookModal
          isOpen={isSelectBookModalOpen}
          onClose={() => {
            setIsSelectBookModalOpen(false);
          }}
        />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { query, req } = context;
  const { userId } = query;

  if (userId == null) {
    return { props: { readReviews: [], unreadReviews: [] } };
  }

  const parsedUserId = Array.isArray(userId) ? userId[0] : userId;

  const axiosInstance = getAxiosInstance(req);

  try {
    const [{ user }, { reviews: readReviews }, { reviews: unreadReviews }] =
      await Promise.all([
        getProfile(axiosInstance)({ userId: parsedUserId }),
        getReviewsByUser(axiosInstance)({
          userId: parsedUserId,
          listType: 'read',
        }),
        getReviewsByUser(axiosInstance)({
          userId: parsedUserId,
          listType: 'unread',
        }),
      ]);

    return {
      props: {
        user,
        readReviews,
        unreadReviews,
      },
    };
  } catch (e) {
    return { props: { readReviews: [], unreadReviews: [] } };
  }
};

export default Profile;
