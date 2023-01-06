import PocketBase from 'pocketbase';

export const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.BACKEND_URL
    : 'http://127.0.0.1:8090';

export const pb = new PocketBase(BACKEND_URL);
