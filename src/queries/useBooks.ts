import { useInfiniteQuery } from 'react-query';
import { getBooks } from '../remotes';
import axios from 'axios';

interface Props {
  keyword: string;
}

const PAGE_SIZE = 50;

export default function useBooks({ keyword }: Props) {
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
