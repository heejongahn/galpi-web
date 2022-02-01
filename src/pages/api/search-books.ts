import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import { getAxiosInstance } from '../../utils/axios';
import {
  BookPayloadFromKakao,
  parseBookPayloadFromKakao,
} from '../../model/Book';

const kakaoApiEndpoint = 'https://dapi.kakao.com/v3/search/book';

export default async function searchBooksHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { KAKAOTALK_REST_API_KEY } = getConfig().serverRuntimeConfig;
  const { keyword: rawKeyword, page, size } = req.query;

  const axiosInstance = getAxiosInstance();
  const keyword = Array.isArray(rawKeyword) ? rawKeyword[0] : rawKeyword;

  const { data } = await axiosInstance.get<{
    documents: BookPayloadFromKakao[];
  }>(
    `${kakaoApiEndpoint}?query=${encodeURIComponent(
      keyword
    )}&page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `KakaoAK ${KAKAOTALK_REST_API_KEY}`,
      },
    }
  );

  const result = data.documents.map(parseBookPayloadFromKakao);
  return res.status(200).json({ books: result });
}
