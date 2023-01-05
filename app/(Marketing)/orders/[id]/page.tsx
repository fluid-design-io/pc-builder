/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BACKEND_URL } from 'lib/pb';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Container } from '@/core/Container';
import ArrowLink from '@/links/ArrowLink';
import { OrderItems } from '@/Order/OrderItems';
import { OrderItemsSkeleton } from '@/Order/OrderItemsSkeleton';

const getOrder = async ({ id }) => {
  const authCookie = cookies().get('pb_auth');
  const token = authCookie ? JSON.parse(authCookie.value).token : null;
  try {
    // also pass expand=address to get the address
    const res = await fetch(
      `${BACKEND_URL}/api/collections/orders/records/${id}?expand=address,recipient`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const order = await res.json();
    return order;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default async function Page({ params: { id } }) {
  const orderData = await getOrder({ id });
  const order = orderData?.data;
  if (Object.keys(order).length === 0) {
    notFound();
  }
  const orderDate = new Date(order.created).toLocaleDateString();
  return (
    <main className=''>
      <Container>
        <div className='space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0'>
          <div className='flex sm:items-baseline sm:space-x-4'>
            <h1 className='text-2xl font-bold tracking-wide sm:text-3xl'>
              Order #{order.id}
            </h1>
            <ArrowLink href='#' className='hidden sm:flex'>
              View invoice
            </ArrowLink>
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-300'>
            Order placed{' '}
            <time
              dateTime={orderDate}
              className='font-medium text-gray-900 dark:text-gray-100'
            >
              {orderDate}
            </time>
          </p>
          <ArrowLink href='#' className='sm:hidden'>
            View invoice
          </ArrowLink>
        </div>

        {/* Products */}
        <section aria-labelledby='products-heading' className='mt-6'>
          <h2 id='products-heading' className='sr-only'>
            Products purchased
          </h2>
          <Suspense fallback={<OrderItemsSkeleton />}>
            {/* @ts-ignore */}
            <OrderItems order={order} />
          </Suspense>
        </section>

        {/* Billing */}
        <section aria-labelledby='summary-heading' className='mt-16'>
          <h2 id='summary-heading' className='sr-only'>
            Billing Summary
          </h2>

          {/* <div className='bg-gray-100 py-6 px-4 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8'>
            <dl className='grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7'>
              <div>
                <dt className='font-medium text-gray-900'>Billing address</dt>
                <dd className='mt-3 text-gray-500'>
                  <span className='block'>Floyd Miles</span>
                  <span className='block'>7363 Cynthia Pass</span>
                  <span className='block'>Toronto, ON N3Y 4H8</span>
                </dd>
              </div>
              <div>
                <dt className='font-medium text-gray-900'>
                  Payment information
                </dt>
                <dd className='-ml-4 -mt-1 flex flex-wrap'>
                  <div className='ml-4 mt-4 flex-shrink-0'>
                    <svg
                      aria-hidden='true'
                      width={36}
                      height={24}
                      viewBox='0 0 36 24'
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-auto'
                    >
                      <rect width={36} height={24} rx={4} fill='#224DBA' />
                      <path
                        d='M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z'
                        fill='#fff'
                      />
                    </svg>
                    <p className='sr-only'>Visa</p>
                  </div>
                  <div className='ml-4 mt-4'>
                    <p className='text-gray-900'>Ending with 4242</p>
                    <p className='text-gray-600'>Expires 02 / 24</p>
                  </div>
                </dd>
              </div>
            </dl>

            <dl className='mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0'>
              <div className='flex items-center justify-between pb-4'>
                <dt className='text-gray-600'>Subtotal</dt>
                <dd className='font-medium text-gray-900'>$72</dd>
              </div>
              <div className='flex items-center justify-between py-4'>
                <dt className='text-gray-600'>Shipping</dt>
                <dd className='font-medium text-gray-900'>$5</dd>
              </div>
              <div className='flex items-center justify-between py-4'>
                <dt className='text-gray-600'>Tax</dt>
                <dd className='font-medium text-gray-900'>$6.16</dd>
              </div>
              <div className='flex items-center justify-between pt-4'>
                <dt className='font-medium text-gray-900'>Order total</dt>
                <dd className='font-medium text-indigo-600'>$83.16</dd>
              </div>
            </dl>
          </div> */}
        </section>
      </Container>
    </main>
  );
}
