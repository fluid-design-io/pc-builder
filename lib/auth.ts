import { cookies } from 'next/headers';

export const getAuth = async () => {
  const nextCookies = cookies();
  const authCookie = nextCookies.get('pb_auth');
  return authCookie?.value ? JSON.parse(authCookie.value) : null;
};
