import {
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  useToast,
  HStack,
  Text,
  Divider,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FormEvent, useCallback, useContext, useState } from 'react';

import CommonHeadElements from '../components/CommonHeadElements';
import Layout from '../components/Layout';
import { FirebaseContext } from '../context/FirebaseContext';
import { useMe } from '../queries/me';

export default function Index() {
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { refetch } = useMe({ enabled: false });

  const { registerWithEmailPassword, sendLoginEmail } =
    useContext(FirebaseContext);

  const handleSubmitEmailPassword = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        await registerWithEmailPassword(email, password);
        toast({
          position: 'top',
          status: 'success',
          title: `${email} 로 인증 메일을 발송했습니다.`,
        });
        refetch();
      } catch {
        toast({
          position: 'top',
          title: '회원가입에 실패했습니다.',
          description: '잠시 후 다시 시도해주세요.',
          status: 'error',
        });
      }
    },
    [registerWithEmailPassword, email, password, toast, refetch]
  );

  const handleSubmitEmailOnly = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        await sendLoginEmail(email);
        toast({
          position: 'top',
          status: 'success',
          title: `${email}(으)로 회원가입 메일을 발송했습니다.`,
        });
      } catch {
        toast({
          position: 'top',
          title: '메일 발송에 실패했습니다.',
          description: '잠시 후 다시 시도해주세요.',
          status: 'error',
        });
      }
    },
    [sendLoginEmail, email, toast]
  );

  const emailPasswordForm = (
    <FullWidthForm onSubmit={handleSubmitEmailPassword}>
      <VStack css={{ width: '100%' }} spacing="24px" align="flex-end">
        <FormControl isRequired>
          <FormLabel htmlFor="email">이메일 주소</FormLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit">회원가입</Button>
      </VStack>
    </FullWidthForm>
  );

  const emailOnlyForm = (
    <FullWidthForm onSubmit={handleSubmitEmailOnly}>
      <VStack css={{ width: '100%' }} spacing="24px" align="flex-end">
        <FormControl isRequired>
          <FormLabel htmlFor="email">이메일 주소</FormLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Button type="submit">회원가입 메일 발송</Button>
      </VStack>
    </FullWidthForm>
  );

  return (
    <Layout>
      <CommonHeadElements title="회원가입" />
      <VStack spacing="24px" align="stretch">
        <VStack spacing="8px" align="stretch">
          <Heading as="h1" alignSelf="flex-start">
            환영합니다!
          </Heading>
          <Heading as="h2" alignSelf="flex-start" size="md">
            메일 주소로 가입하고 독서 생활의 갈피를 남겨보세요.
          </Heading>
        </VStack>
        <Tabs css={{ margin: '24px 0', width: '100%' }} colorScheme="black">
          <TabList>
            <Tab>비밀번호로 회원가입</Tab>
            <Tab>메일 주소로 회원가입</Tab>
          </TabList>
          <TabPanels>
            <TabPanel padding="0">
              <TabPanelContent>{emailPasswordForm}</TabPanelContent>
            </TabPanel>
            <TabPanel padding="0">
              <TabPanelContent>{emailOnlyForm}</TabPanelContent>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Divider />
        <HStack align="center" justify="end">
          <Text color="gray">이미 계정이 있으신가요?</Text>
          <Link passHref href="/login">
            <Button variant="link">로그인</Button>
          </Link>
        </HStack>
      </VStack>
    </Layout>
  );
}

const FullWidthForm = styled.form`
  width: 100%;
`;

const TabPanelContent = styled(Flex)`
  width: 100%;
  padding: 24px 0;
`;
