import { useMutation, UseMutationOptions } from 'react-query';

import { BookPayload } from '../model/Book';
import { Review, ReviewPayload } from '../model/Review';
import { RevisionPayload } from '../model/Revision';
import { createReview, createRevision, createUnreadReview } from '../remotes';
import { getAxiosInstance } from '../utils/axios';

interface CreateReviewWithoutRevisionParams {
  bookPayload: BookPayload;
}

interface CreateReviewWithoutRevisionResponse {
  review: Review;
}

export function useCreateReviewWithoutRevision(
  options?: UseMutationOptions<
    CreateReviewWithoutRevisionResponse,
    unknown,
    CreateReviewWithoutRevisionParams
  >
) {
  const axiosInstance = getAxiosInstance();
  return useMutation(
    async ({ bookPayload }: CreateReviewWithoutRevisionParams) => {
      const { review } = await createUnreadReview(axiosInstance)({
        bookPayload,
      });
      return { review };
    },
    options
  );
}

interface CreateReviewParams {
  bookId: string;
  reviewPayload: ReviewPayload;
  revisionPayload: RevisionPayload;
}

interface CreateReviewResponse {
  review: Review;
}

export function useCreateReview(
  options?: UseMutationOptions<
    CreateReviewResponse,
    unknown,
    CreateReviewParams
  >
) {
  const axiosInstance = getAxiosInstance();
  return useMutation(async (params: CreateReviewParams) => {
    const { review } = await createReview(axiosInstance)({
      ...params,
    });
    return { review };
  }, options);
}

interface CreateRevisionParams {
  reviewId: Review['id'];
  revisionPayload: RevisionPayload;
}

interface CreateRevisionResponse {
  review: Review;
}

export function useCreateRevision(
  options?: UseMutationOptions<
    CreateRevisionResponse,
    unknown,
    CreateRevisionParams
  >
) {
  const axiosInstance = getAxiosInstance();
  return useMutation(async (params: CreateRevisionParams) => {
    const { review } = await createRevision(axiosInstance)({
      ...params,
    });
    return { review };
  }, options);
}
