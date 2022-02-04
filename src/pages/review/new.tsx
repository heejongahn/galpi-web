import { Heading, Button, HStack, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import '@toast-ui/editor/dist/toastui-editor.css';

import CommonHeadElements from '../../components/CommonHeadElements';
// import { getAxiosInstance } from '../../utils/axios';
import ToastEditor from '../../components/Editor';
import Layout from '../../components/Layout';

const WriteReview: NextPage = () => {
  // const axios = getAxiosInstance();
  return (
    <>
      <CommonHeadElements title="새 독후감 작성" />
      <Layout>
        <VStack spacing="24px" align="stretch">
          <Heading as="h1">새 글 작성</Heading>
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
          <HStack align="center" justify="flex-end" spacing="24px">
            <Button variant="ghost">임시 저장</Button>
            <Button>작성하기</Button>
          </HStack>
        </VStack>
      </Layout>
    </>
  );
};

export default WriteReview;
