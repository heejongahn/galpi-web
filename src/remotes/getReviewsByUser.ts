import type { AxiosInstance } from 'axios';
import getConfig from 'next/config';
import { Review } from '../model/Review';

interface Params {
  userId: string;
}

interface Response {
  reviews: Review[];
}

export function getReviewsByUser(axiosInstance: AxiosInstance) {
  return async function ({ userId }: Params) {
    const { publicRuntimeConfig } = getConfig();

    const { data } = await axiosInstance.get<Response>(
      `${publicRuntimeConfig.API_ENDPOINT}/review/list`,
      {
        params: { userId },
      }
    );
    return data;
  };
}
