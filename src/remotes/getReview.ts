import axios from 'axios';
import { Review } from '../model/Review';

interface Params {
  id: string;
}

interface Response {
  review: Review;
}

export async function getReview({ id }: Params) {
  const { data } = await axios.get<Response>(
    `${process.env.API_ENDPOINT}/review/get?id=${id}`
  );
  return data;
}
