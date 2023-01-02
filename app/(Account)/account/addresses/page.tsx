/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BACKEND_URL } from 'lib/pb';
import { getAuth } from 'lib/auth';
import { AccountAddresses } from '@/account/AccountAddresses';
import { Suspense } from 'react';

const getUserAddresses = async ({ auth }) => {
  if (!auth) return null;
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/collections/addresses/records?filter[user_id]=${auth.model.id}`,
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
  const addresses = getUserAddresses({ auth });

  return (
    <div className='lg:col-span-9'>
      <h2 className='mt-8 px-4 tracking-wide sm:px-6 md:mt-10 lg:mt-12'>
        Addresses
      </h2>
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* @ts-ignore */}
        <AccountAddresses promise={addresses} />
      </Suspense>
    </div>
  );
}
