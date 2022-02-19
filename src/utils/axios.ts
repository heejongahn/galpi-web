import type { IncomingMessage } from 'http';

import axios from 'axios';
import getConfig from 'next/config';
import Cookies from 'universal-cookie';

import { COOKIE_KEY_ACCESS_TOKEN } from '../constants';

export function getAxiosInstance(req?: IncomingMessage) {
  const { publicRuntimeConfig } = getConfig();

  const defaultConfig = { baseURL: publicRuntimeConfig.API_ENDPOINT };

  const cookies = req != null ? new Cookies(req.headers.cookie) : new Cookies();

  const axiosInstance = axios.create(defaultConfig);
  axiosInstance.interceptors.request.use((config) => {
    const accessTokenFromCookie = cookies.get(COOKIE_KEY_ACCESS_TOKEN) ?? '';
    if (accessTokenFromCookie === '') {
      return config;
    }

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessTokenFromCookie}`,
      },
    };
  });

  return axiosInstance;
}
