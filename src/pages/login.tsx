import { FormEvent, useCallback, useContext, useState } from 'react';
import {
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Heading,
} from '@chakra-ui/react';

import Layout from '../components/Layout';
import { FirebaseContext } from '../context/FirebaseContext';
import CommonHeadElements from '../components/CommonHeadElements';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginWithEmailPassword } = useContext(FirebaseContext);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      loginWithEmailPassword(email, password);
    },
    [loginWithEmailPassword, email, password]
  );

  return (
    <Layout>
      <CommonHeadElements title="로그인" />
      <form onSubmit={handleSubmit}>
        <VStack spacing="24px" align="flex-end">
          <Heading as="h1" alignSelf="flex-start">
            반가워요!
          </Heading>
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
      </form>
    </Layout>
  );
}
