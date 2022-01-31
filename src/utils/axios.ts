import axios from 'axios';
import getConfig from 'next/config';
import type { IncomingMessage } from 'http';
import Cookies from 'universal-cookie';
import { COOKIE_KEY_ACCESS_TOKEN } from '../constants';

export function getAxiosInstance(req?: IncomingMessage) {
  const { publicRuntimeConfig } = getConfig();

  const defaultConfig = { baseURL: publicRuntimeConfig.API_ENDPOINT };

  const cookies = req != null ? new Cookies(req.headers.cookie) : new Cookies();

  const accessTokenFromCookie = cookies.get(COOKIE_KEY_ACCESS_TOKEN) ?? '';

  return axios.create(
    accessTokenFromCookie === ''
      ? defaultConfig
      : {
          ...defaultConfig,
          headers: {
            Authorization: `Bearer ${accessTokenFromCookie}`,
          },
        }
  );
}
