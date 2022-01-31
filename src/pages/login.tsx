import { FormEvent, useCallback, useContext, useState } from 'react';

import Layout from '../components/Layout';
import styled from '@emotion/styled';
import TextField from '../components/TextField';
import { Button } from '../atoms';
import { FirebaseContext } from '../context/FirebaseContext';

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
      <Title>로그인</Title>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          id="email"
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => {}}>로그인</Button>
      </form>
    </Layout>
  );
}

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 24px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 24px;
`;
