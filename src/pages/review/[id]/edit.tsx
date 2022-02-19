import { Heading, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRouter } from 'next/router';

import CommonHeadElements from '../../../components/CommonHeadElements';
// import { getAxiosInstance } from '../../utils/axios';
import Layout from '../../../components/Layout';
import RevisionEditor from '../../../components/RevisionEditor';
import { Review } from '../../../model/Review';
import { useCreateRevision } from '../../../queries/review';
import { getReview } from '../../../remotes';
import { getAxiosInstance } from '../../../utils/axios';

interface Props {
  review?: Review;
}

export default function WriteReview({ review }: Props) {
  const { replace } = useRouter();
  const { mutateAsync: createRevision } = useCreateRevision({
    onSuccess: (response) => {
      replace(`/review/${response.review.id}`);
    },
  });

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

  const pageTitle = '독후감 수정';
  const activeRevision = review?.activeRevision;

  return (
    <>
      <CommonHeadElements title={pageTitle} />
      <Layout>
        <VStack spacing="24px" align="stretch">
          <Heading as="h1">{pageTitle}</Heading>
          <RevisionEditor
            currentRevision={activeRevision}
            onSave={async (params) => {
              await createRevision({
                reviewId: review.id,
                revisionPayload: params,
              });
            }}
          />
        </VStack>
      </Layout>
    </>
  );
}

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
