import { HeadDefaultTags } from '@/core/HeadDefaultTags';

export default function Head() {
  return (
    <>
      <title>PC Builder</title>
      <meta
        name='description'
        content='Simple Tracker is a simple app to track your orders'
      />
      <HeadDefaultTags />
    </>
  );
}
