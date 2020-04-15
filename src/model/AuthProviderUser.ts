import { User } from './User';

export enum AuthProviderType {
  google = 'google',
  facebook = 'facebook',
  twitter = 'twitter',
  firebase = 'firebase',
}

export interface AuthProviderUser {
  id: string;
  providerType: AuthProviderType;
  providerId: string;
  user: User;
}
