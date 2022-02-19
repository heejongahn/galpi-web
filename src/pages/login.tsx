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
  Divider,
  HStack,
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useContext, useState, useEffect } from 'react';

import CommonHeadElements from '../components/CommonHeadElements';
import Layout from '../components/Layout';
import { FirebaseContext } from '../context/FirebaseContext';
import { useMe } from '../queries/me';

export default function Index() {
  const toast = useToast();

  const { replace, query } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registeredFromQuery = query['registered'];
  const registered = Array.isArray(registeredFromQuery)
    ? registeredFromQuery[0]
    : registeredFromQuery;

  useEffect(() => {
    if (registered === 'y') {
      toast({
        position: 'top',
        status: 'success',
        title: `이메일 주소 인증이 완료되었습니다. 가입한 계정 정보로 로그인하세요.`,
      });
    }
  }, [registered, toast]);

  const { refetch } = useMe({ enabled: false });

  const { loginWithEmailPassword, sendLoginEmail } =
    useContext(FirebaseContext);

  const handleSubmitEmailPassword = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        await loginWithEmailPassword(email, password);
        toast({
          position: 'top',
          status: 'success',
          title: `성공적으로 로그인되었습니다.`,
        });
        const { data } = await refetch();
        replace(`/profile/${data?.user.id}`);
      } catch {
        toast({
          position: 'top',
          title: '로그인에 실패했습니다.',
          description: '잠시 후 다시 시도해주세요.',
          status: 'error',
        });
      }
    },
    [loginWithEmailPassword, email, password, toast, replace, refetch]
  );

  const handleSubmitEmailOnly = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        await sendLoginEmail(email);
        toast({
          position: 'top',
          status: 'success',
          title: `${email}(으)로 로그인 메일을 발송했습니다.`,
        });
      } catch {
        toast({
          position: 'top',
          title: '로그인에 실패했습니다.',
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
        <Button type="submit">로그인</Button>
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
        <Button type="submit">로그인 메일 발송</Button>
      </VStack>
    </FullWidthForm>
  );

  return (
    <Layout>
      <CommonHeadElements title="로그인" />
      <VStack spacing="24px" align="stretch">
        <VStack spacing="8px" align="stretch">
          <Heading as="h1" alignSelf="flex-start">
            반가워요!
          </Heading>
          <Heading as="h2" alignSelf="flex-start" size="md">
            로그인하고 독서 생활의 갈피를 남겨보세요.
          </Heading>
        </VStack>
        <Tabs css={{ margin: '24px 0', width: '100%' }} colorScheme="black">
          <TabList>
            <Tab>비밀번호로 로그인</Tab>
            <Tab>메일 주소로 로그인</Tab>
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
          <Text color="gray">아직 계정이 없으신가요?</Text>
          <Link passHref href="/register">
            <Button variant="link">회원가입</Button>
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
