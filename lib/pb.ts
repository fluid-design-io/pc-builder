import PocketBase from 'pocketbase';

export const pb = new PocketBase(
  process.env.NODE_ENV === 'production'
    ? process.env.PB_URL
    : 'http://127.0.0.1:8090'
);

export const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.BACKEND_URL
    : 'http://127.0.0.1:8090';
