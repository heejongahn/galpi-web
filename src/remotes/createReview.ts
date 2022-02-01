import type { AxiosInstance } from 'axios';
import getConfig from 'next/config';
import { Review, ReviewPayload } from '../model/Review';
import { RevisionPayload } from '../model/Revision';

interface Params {
  bookId: string;
  reviewPayload: ReviewPayload;
  revisionPayload: RevisionPayload;
}

interface Response {
  review: Review;
}

export function createReview(axiosInstance: AxiosInstance) {
  return async function (params: Params) {
    const { publicRuntimeConfig } = getConfig();

    const { data } = await axiosInstance.post<Response>(
      `${publicRuntimeConfig.API_ENDPOINT}/review/create`,
      { data: params }
    );
    return data;
  };
}
