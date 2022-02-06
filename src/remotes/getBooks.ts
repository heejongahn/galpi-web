import type { AxiosInstance } from 'axios';
import { BookPayload } from '../model/Book';

interface Params {
  keyword: string;
  page: number;
  size: number;
}

interface Response {
  books: BookPayload[];
}

export function getBooks(axiosInstance: AxiosInstance) {
  return async function ({ keyword, page, size }: Params) {
    const { data } = await axiosInstance.get<Response>(`/api/search-books`, {
      baseURL: '',
      params: {
        keyword,
        page,
        size,
      },
    });
    return data.books;
  };
}
