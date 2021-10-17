import axios from 'axios';
import { NextApiHandler } from 'next';
import getConfig from 'next/config';

interface Params {
  token: string;
}

interface Response {
  token: string;
  refreshToken: string;
}

async function login({ token }: Params) {
  const { publicRuntimeConfig } = getConfig();

  const { data } = await axios.post<Response>(
    `${publicRuntimeConfig.API_ENDPOINT}/register/firebase`,
    {
      token,
    }
  );

  return data;
}

const loginHandler: NextApiHandler = async (req, res) => {
  const { token } = req.body;
  const data = await login({ token });
  const oneWeekInSeconds = 60 * 60 * 24 * 7;
  const maxAge = oneWeekInSeconds;

  const cookieValues = {
    accessToken: data.token,
    refreshToken: data.refreshToken,
  };

  const cookieValueStrings = Object.entries(cookieValues).map(
    ([key, value]) => `${key}=${value}`
  );

  const cookieSetting = {
    Path: '/',
    'Max-Age': maxAge,
  };

  const cookieSettingString = Object.entries(cookieSetting)
    .map(([key, value]) => `${key}=${value}`)
    .join(';');

  res.setHeader(
    'Set-Cookie',
    cookieValueStrings.map(
      (cookieValueString) => `${cookieValueString};${cookieSettingString}`
    )
  );

  return res.status(200).json(data);
};

export default loginHandler;
