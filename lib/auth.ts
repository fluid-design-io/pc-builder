import { cookies } from 'next/headers';
import { BaseAuthStore } from 'pocketbase';

export const getAuth = async (): Promise<BaseAuthStore | null> => {
  const nextCookies = cookies();
  const authCookie = nextCookies.get('pb_auth');
  return authCookie?.value ? JSON.parse(authCookie.value) : null;
};
