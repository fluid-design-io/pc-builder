import Image from 'next/image';

import { AddAddress, ModifyAddress } from './ModifyAddress';

const AddressBox = ({ address, index }) => {
  return (
    <div className='card-secondary card-secondary-hover !p-0'>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2 p-4'>
          <dl className='flex-grow'>
            <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              Address {index + 1}
            </dt>
            <dd className='text-sm text-gray-900 dark:text-gray-100'>
              {address.street}
            </dd>
            <dd className='text-sm text-gray-900 dark:text-gray-100'>
              {address.city}, {address.state} {address.zip}
            </dd>
            <dd className='text-sm text-gray-900 dark:text-gray-100'>
              {address.country}
            </dd>
          </dl>
          <div className='relative flex-shrink-0'>
            <Image
              src={address.snapshot_url}
              width={96}
              height={96}
              className='rounded'
              alt={`Address ${index + 1} snapshot`}
            />
          </div>
        </div>
        <div className='grid grid-cols-2 divide-x divide-gray-100 border-t border-t-gray-100 dark:divide-gray-600/40 dark:border-gray-600/40'>
          <ModifyAddress address={address} />
        </div>
      </div>
    </div>
  );
};

export const AccountAddresses = async ({ promise }) => {
  const addresses = await promise;
  if (!addresses) return null;
  const { items } = addresses;
  const isMaxAddressesReached = items.length && items.length >= 6;
  return (
    <div className='divide-y divide-gray-100 dark:divide-gray-600/40'>
      {!!isMaxAddressesReached && (
        <p className='px-4 sm:p-6'>
          You have reached the maximum number of addresses. Please delete an
          address to add a new one.
        </p>
      )}
      <div className='grid gap-4 py-6 px-4 sm:p-6 md:grid-cols-2 lg:pb-8'>
        {!isMaxAddressesReached && <AddAddress />}

        {!!items.length &&
          items.map((address, index) => (
            <AddressBox
              address={address}
              index={index}
              key={`address-${index}`}
            />
          ))}
      </div>
    </div>
  );
};
