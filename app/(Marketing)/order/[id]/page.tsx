/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OrderNotFound } from '@/Order/OrderNotFound';
import { Suspense } from 'react';

export default async function Page({ params: { id } }) {
  const order = undefined;
  if (!order) {
    return (
      <main className='order-layout-wrap'>
        <section className='order-layout'>
          <OrderNotFound id={id} />
        </section>
      </main>
    );
  }
  return (
    <main className='order-layout-wrap'>
      <section className='order-layout relative grid-cols-1 items-start md:grid-cols-5'>
        {/* <OrderInfo order={order} /> */}
        <Suspense fallback={<p>Loading timeline...</p>}>
          {/* @ts-ignore */}
          {/* <OrderTimeline
            id={id}
            currentStatus={order.status}
            deliveryDate={order.deliveryDate}
          /> */}
        </Suspense>
      </section>
    </main>
  );
}
