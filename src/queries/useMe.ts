import { UseQueryOptions, useQuery } from 'react-query';
import { User } from '../model/User';
import { getMe } from '../remotes';
import { getAxiosInstance } from '../utils/axios';

export default function useMe(options?: UseQueryOptions<{ user: User }, void>) {
  const axiosInstance = getAxiosInstance();

  return useQuery({
    queryKey: `__ME__`,
    queryFn: () => {
      return getMe(axiosInstance)();
    },
    ...options,
  });
}
