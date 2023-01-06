import PocketBase from 'pocketbase';

export const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.BACKEND_URL
    : 'https://billowing-hill-1662.fly.dev';

export const pb = new PocketBase(BACKEND_URL);
