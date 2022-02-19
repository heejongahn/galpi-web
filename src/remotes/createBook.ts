import type { AxiosInstance } from 'axios';
import getConfig from 'next/config';

import { Book, BookPayload } from '../model/Book';

interface Params {
  bookPayload: BookPayload;
}

interface Response {
  book: Book;
}

export function createBook(axiosInstance: AxiosInstance) {
  return async function ({ bookPayload }: Params) {
    const { publicRuntimeConfig } = getConfig();

    const { data } = await axiosInstance.post<Response>(
      `${publicRuntimeConfig.API_ENDPOINT}/book/create`,
      { bookPayload }
    );
    return data;
  };
}
