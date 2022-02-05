import { useMutation, UseMutationOptions } from 'react-query';

import { BookPayload } from '../model/Book';
import { Review } from '../model/Review';
import { RevisionPayload } from '../model/Revision';
import { createRevision, createUnreadReview } from '../remotes';
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

interface CreatRevisionParams {
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
    CreatRevisionParams
  >
) {
  const axiosInstance = getAxiosInstance();
  return useMutation(async (params: CreatRevisionParams) => {
    const { review } = await createRevision(axiosInstance)({
      ...params,
    });
    return { review };
  }, options);
}
