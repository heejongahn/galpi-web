import axios from 'axios';
import getConfig from 'next/config';
import { User } from '../model/User';

interface Params {
  userId: string;
}

interface Response {
  user: User;
}

export async function getProfile({ userId }: Params) {
  const { publicRuntimeConfig } = getConfig();

  const { data } = await axios.get<Response>(
    `${publicRuntimeConfig.API_ENDPOINT}/profile`,
    {
      params: { userId },
    }
  );

  return data;
}
