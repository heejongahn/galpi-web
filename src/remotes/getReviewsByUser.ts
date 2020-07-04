import axios from 'axios';
import getConfig from 'next/config';
import { Review } from '../model/Review';

interface Params {
  userId: string;
}

interface Response {
  reviews: Review[];
}

export async function getReviewsByUser({ userId }: Params) {
  const { publicRuntimeConfig } = getConfig();

  const { data } = await axios.get<Response>(
    `${publicRuntimeConfig.API_ENDPOINT}/review/list`,
    {
      params: { userId },
    }
  );
  return data;
}
