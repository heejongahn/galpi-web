import type { AxiosInstance } from 'axios';
import getConfig from 'next/config';
import { Review } from '../model/Review';

interface Params {
  id: string;
}

interface Response {
  review: Review;
}

export function getReview(axiosInstance: AxiosInstance) {
  return async function ({ id }: Params) {
    const { publicRuntimeConfig } = getConfig();

    const { data } = await axiosInstance.get<Response>(
      `${publicRuntimeConfig.API_ENDPOINT}/review/get?id=${id}`
    );
    return data;
  };
}
