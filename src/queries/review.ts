import { useMutation, UseMutationOptions } from 'react-query';
import { BookPayload } from '../model/Book';
import { Review } from '../model/Review';
import { createUnreadReview } from '../remotes';
import { getAxiosInstance } from '../utils/axios';

interface MutateParams {
  bookPayload: BookPayload;
}

interface MutateResponse {
  review: Review;
}

export function useCreateReviewWithoutRevision(
  options?: UseMutationOptions<MutateResponse, unknown, MutateParams>
) {
  const axiosInstance = getAxiosInstance();
  return useMutation(async ({ bookPayload }: MutateParams) => {
    const { review } = await createUnreadReview(axiosInstance)({ bookPayload });
    return { review };
  }, options);
}
