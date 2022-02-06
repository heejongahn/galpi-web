import { Heading, useToast, VStack } from '@chakra-ui/react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRouter } from 'next/router';

import CommonHeadElements from '../../components/CommonHeadElements';
// import { getAxiosInstance } from '../../utils/axios';
import Layout from '../../components/Layout';
import RevisionEditor from '../../components/RevisionEditor';
import useSelectedBook from '../../hooks/useSelectedBook';
import { RevisionPayload } from '../../model/Revision';
import { useCreateBook } from '../../queries/book';
import { useCreateReview } from '../../queries/review';

export default function WriteReview() {
  const toast = useToast();

  const { replace } = useRouter();
  const { mutateAsync: createReview } = useCreateReview({
    onSuccess: (response) => {
      replace(`/review/${response.review.id}`);
    },
  });

  const { mutateAsync: createBook } = useCreateBook({});

  const { state } = useSelectedBook();

  const pageTitle = '독후감 작성';

  const handleSave = async (params: RevisionPayload) => {
    if (state == null) {
      toast({
        position: 'top',
        title: '올바르지 않은 접근입니다.',
        status: 'error',
      });
      return;
    }

    const { book } = await createBook({ bookPayload: state.bookPayload });
    await createReview({
      bookId: book.id,
      reviewPayload: { isPublic: false },
      revisionPayload: params,
    });
  };

  if (state == null) {
    return null;
  }

  console.log(state);

  return (
    <>
      <CommonHeadElements title={pageTitle} />
      <Layout>
        <VStack spacing="24px" align="stretch">
          <Heading as="h1">{pageTitle}</Heading>
          <RevisionEditor onSave={handleSave} />
        </VStack>
      </Layout>
    </>
  );
}
