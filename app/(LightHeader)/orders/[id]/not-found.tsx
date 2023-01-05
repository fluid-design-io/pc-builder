import { OrderNotFound } from '@/Order/OrderNotFound';

export default function NotFound() {
  return (
    <main className='order-layout-wrap'>
      <section className='order-layout'>
        <OrderNotFound />
      </section>
    </main>
  );
}
