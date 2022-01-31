import type { AxiosInstance } from 'axios';

interface Params {
  token: string;
}

interface Response {
  token: string;
  refreshToken: string;
}

export function login(axiosInstance: AxiosInstance) {
  return async function ({ token }: Params) {
    const { data } = await axiosInstance.post<Response>(`/register/firebase`, {
      token,
    });

    return data;
  };
}
