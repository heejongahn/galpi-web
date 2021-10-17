import axios from 'axios';

interface Params {
  token: string;
}

interface Response {
  token: string;
  refreshToken: string;
}

export async function login({ token }: Params) {
  const { data } = await axios.post<Response>(`/api/login`, {
    token,
  });

  return data;
}
