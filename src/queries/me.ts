import { UseQueryOptions, useQuery } from 'react-query';
import Cookies from 'universal-cookie';

import { COOKIE_KEY_ACCESS_TOKEN } from '../constants';
import { User } from '../model/User';
import { getMe } from '../remotes';
import { getAxiosInstance } from '../utils/axios';

type UseMeOptions = UseQueryOptions<{ user: User }, void>;

export function useMe(options?: UseMeOptions) {
  const axiosInstance = getAxiosInstance();
  const cookies = new Cookies();
  const accessToken = cookies.get(COOKIE_KEY_ACCESS_TOKEN) ?? '';

  return useQuery({
    queryKey: `__ME__`,
    queryFn: () => {
      return getMe(axiosInstance)();
    },
    enabled: accessToken !== '',
    ...options,
  });
}

export function useIsMe(userId: string | undefined, options?: UseMeOptions) {
  const { data: me } = useMe(options);
  return me?.user.id === userId;
}
