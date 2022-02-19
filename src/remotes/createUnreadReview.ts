import type { AxiosInstance } from 'axios';
import getConfig from 'next/config';
import { BookPayload } from '../model/Book';
import { Review } from '../model/Review';

interface Params {
  bookPayload: BookPayload;
}

interface Response {
  review: Review;
}

export function createUnreadReview(axiosInstance: AxiosInstance) {
  return async function (params: Params) {
    const { publicRuntimeConfig } = getConfig();

    const { data } = await axiosInstance.post<Response>(
      `${publicRuntimeConfig.API_ENDPOINT}/review/create-unread`,
      params
    );
    return data;
  };
}
