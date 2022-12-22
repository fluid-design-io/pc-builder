import { LoadingSkeleton } from "../../../components/core/LoadingSkeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className='order-layout-wrap'>
      <section className='order-layout'>
        <LoadingSkeleton />
      </section>
    </main>
  );
}
