import axios from 'axios';
import getConfig from 'next/config';
import { Review } from '../model/Review';

interface Params {
  id: string;
}

interface Response {
  review: Review;
}

export async function getReview({ id }: Params) {
  const { publicRuntimeConfig } = getConfig();

  const { data } = await axios.get<Response>(
    `${publicRuntimeConfig.API_ENDPOINT}/review/get?id=${id}`
  );
  return data;
}
