/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BACKEND_URL } from 'lib/pb';
import { getAuth } from 'lib/auth';
import { UserOrders, UserOrderSkeleton } from '@/account/UserOrders';
import { Suspense } from 'react';

const getOrders = async ({ auth }) => {
  if (!auth) return null;
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/collections/orders/records?filter[recipient_id]=${auth.model.id}`,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Page() {
  const auth = await getAuth();
  const ordersData = getOrders({ auth });

  return (
    <div className='lg:col-span-9'>
      <h2 className='mt-8 px-4 tracking-wide sm:px-6 md:mt-10 lg:mt-12'>
        My Orders
      </h2>

      <div className='py-6 px-4 sm:p-6 lg:pb-8'>
        <Suspense fallback={<UserOrderSkeleton />}>
          {/* @ts-ignore */}
          <UserOrders promise={ordersData} />
        </Suspense>
      </div>
    </div>
  );
}
