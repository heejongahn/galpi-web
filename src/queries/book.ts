import axios from 'axios';
import { useInfiniteQuery, useMutation, UseMutationOptions } from 'react-query';

import { Book, BookPayload } from '../model/Book';
import { createBook, getBooks } from '../remotes';
import { getAxiosInstance } from '../utils/axios';

interface Props {
  keyword: string;
}

const PAGE_SIZE = 50;

export function useBooks({ keyword }: Props) {
  const axiosInstance = axios.create();

  return useInfiniteQuery(
    [`__BOOKS__`, keyword],
    ({ pageParam = 1 }) => {
      return getBooks(axiosInstance)({
        keyword,
        page: pageParam,
        size: PAGE_SIZE,
      });
    },
    {
      enabled: keyword !== '',
      getNextPageParam: (prev, all) => {
        if (prev.length < PAGE_SIZE) {
          return false;
        }

        return Math.floor(all.flat().length / PAGE_SIZE);
      },
    }
  );
}

interface CreateBookParams {
  bookPayload: BookPayload;
}

interface CreateBookResponse {
  book: Book;
}

export function useCreateBook(
  options?: UseMutationOptions<CreateBookResponse, unknown, CreateBookParams>
) {
  const axiosInstance = getAxiosInstance();
  return useMutation(async (params: CreateBookParams) => {
    const { book } = await createBook(axiosInstance)({
      ...params,
    });
    return { book };
  }, options);
}
