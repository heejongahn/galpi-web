import { AuthProviderUser } from './AuthProviderUser';

export interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  displayName?: string;
  authProviderUsers?: AuthProviderUser[];
  profileImageUrl?: string;
}
