import { NextPage, GetServerSideProps } from 'next';

import CommonHeadElements from '../../components/CommonHeadElements';
import Layout from '../../components/Layout';
import ReviewLists from '../../components/ReviewLists';
import UserAvatar from '../../components/UserAvatar';
import { Review } from '../../model/Review';
import { User } from '../../model/User';
import { getProfile, getReviewsByUser } from '../../remotes';
import { getAxiosInstance } from '../../utils/axios';

interface Props {
  user?: User;
  readReviews: Review[];
  unreadReviews: Review[];
}

const Profile: NextPage<Props> = ({ user, readReviews, unreadReviews }) => {
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
        <UserAvatar
          user={user}
          title={user.displayName ?? user.email}
          subtitle="님의 독후감"
        />
        <ReviewLists readReviews={readReviews} unreadReviews={unreadReviews} />
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
