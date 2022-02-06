import { Center, Spinner, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { FirebaseContext } from '../context/FirebaseContext';
import { useMe } from '../queries/me';

export default function Index() {
  const toast = useToast();
  const { query, replace } = useRouter();
  const didLogin = useRef(false);

  const { refetch } = useMe();

  const emailFromQuery = query['email'];
  const email = Array.isArray(emailFromQuery)
    ? emailFromQuery[0]
    : emailFromQuery;

  const { loginWithEmailOnly } = useContext(FirebaseContext);

  const login = useCallback(async () => {
    await loginWithEmailOnly(email);
    toast({
      position: 'top',
      status: 'success',
      title: `성공적으로 로그인되었습니다.`,
    });
    replace('/');
    refetch();
  }, [email, loginWithEmailOnly, replace, toast, refetch]);

  useEffect(() => {
    if (didLogin.current) {
      return;
    }

    didLogin.current = true;
    login();
  }, [login]);

  return (
    <Center css={{ width: '100%', height: '100%' }}>
      <Spinner />
    </Center>
  );
}
