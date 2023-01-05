import { OrderNotFound } from '@/Order/OrderNotFound';

export default function NotFound(params) {
  console.log(`params`, params);
  return (
    <main className='order-layout-wrap'>
      <section className='order-layout'>
        <OrderNotFound />
      </section>
    </main>
  );
}
