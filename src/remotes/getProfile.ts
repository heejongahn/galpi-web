import type { AxiosInstance } from 'axios';
import getConfig from 'next/config';
import { User } from '../model/User';

interface Params {
  userId: string;
}

interface Response {
  user: User;
}

export function getProfile(axiosInstance: AxiosInstance) {
  return async ({ userId }: Params) => {
    const { publicRuntimeConfig } = getConfig();

    const { data } = await axiosInstance.get<Response>(
      `${publicRuntimeConfig.API_ENDPOINT}/profile`,
      {
        params: { userId },
      }
    );

    return data;
  };
}
