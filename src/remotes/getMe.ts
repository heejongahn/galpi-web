import type { AxiosInstance } from 'axios';
import getConfig from 'next/config';

import { User } from '../model/User';

interface Response {
  user: User;
}

export function getMe(axiosInstance: AxiosInstance) {
  return async () => {
    const { publicRuntimeConfig } = getConfig();

    const { data } = await axiosInstance.get<Response>(
      `${publicRuntimeConfig.API_ENDPOINT}/me`
    );

    return data;
  };
}
