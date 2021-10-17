import axios from 'axios';
import getConfig from 'next/config';
import Cookies from 'js-cookie';

import { User } from '../model/User';

interface Response {
  user: User;
}

export async function getMe() {
  const { publicRuntimeConfig } = getConfig();

  const { data } = await axios.get<Response>(
    `${publicRuntimeConfig.API_ENDPOINT}/me`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    }
  );

  return data;
}
