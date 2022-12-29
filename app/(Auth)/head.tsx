import { HeadFavIcon } from '@/core/HeadFavIcon';

export default function Head() {
  return (
    <>
      <title>Sign In</title>
      <meta
        name='description'
        content='Simple Tracker is a simple app to track your orders'
      />
      <meta
        content='width=device-width, initial-scale=1, viewport-fit=cover'
        name='viewport'
      />
      <meta charSet='utf-8' />
      <HeadFavIcon />
    </>
  );
}
