import type { AxiosInstance } from 'axios';
import getConfig from 'next/config';

import { Review } from '../model/Review';
import { RevisionPayload } from '../model/Revision';

interface Params {
  reviewId: string;
  revisionPayload: RevisionPayload;
}

interface Response {
  review: Review;
}

export function createRevision(axiosInstance: AxiosInstance) {
  return async function (params: Params) {
    const { publicRuntimeConfig } = getConfig();

    const { data } = await axiosInstance.post<Response>(
      `${publicRuntimeConfig.API_ENDPOINT}/review/create-revision`,
      params
    );
    return data;
  };
}
