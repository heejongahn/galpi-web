import { UseQueryOptions, useQuery } from 'react-query';

import { User } from '../model/User';
import { getMe } from '../remotes';
import { getAxiosInstance } from '../utils/axios';

type UseMeOptions = UseQueryOptions<{ user: User }, void>;

export function useMe(options?: UseMeOptions) {
  const axiosInstance = getAxiosInstance();

  return useQuery({
    queryKey: `__ME__`,
    queryFn: () => {
      return getMe(axiosInstance)();
    },
    ...options,
  });
}

export function useIsMe(userId: string | undefined, options?: UseMeOptions) {
  const { data: me } = useMe(options);
  return me?.user.id === userId;
}
