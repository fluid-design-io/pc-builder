/* eslint-disable @typescript-eslint/ban-ts-comment */
import clsxm from 'lib/clsxm';
import { pb } from 'lib/pb';
import Image from 'next/image';

import PrimaryLink from '@/links/PrimaryLink';

import { OrderStatus } from './OrderStatus';

export const OrderItems = async ({ order }) => {
  const order_items = await pb
    .collection('order_items')
    .getList(1, 50, {
      filter: `order.id = '${order.id}'`,
      expand: `status`,
    })
    .catch(() => null);
  const hasUserInfo = order.address && order.expand?.recipient;
  return (
    <div className='space-y-8'>
      {order_items.items.map((product) => (
        <div key={product.id} className='card-secondary card-secondary-hover'>
          <div className='py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8'>
            <div className='sm:flex lg:col-span-7'>
              <div className='sm:aspect-none aspect-square w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-40 sm:w-40'>
                <div className='h-full w-full max-w-sm bg-gray-500/20 object-cover object-center sm:h-full sm:w-full' />
              </div>

              <div className='mt-6 sm:mt-0 sm:ml-6'>
                <h3 className='text-xl font-medium tracking-wide text-gray-900 dark:text-gray-50'>
                  {product.name}
                </h3>
                <p className='mt-2 text-sm font-medium text-gray-900 dark:text-gray-50'>
                  ${product.price / 100}
                </p>
                <p className='mt-3 whitespace-pre-line text-sm text-gray-500 dark:text-gray-400'>
                  {product.description}
                </p>
              </div>
            </div>

            <div className='mt-6 lg:col-span-5 lg:mt-0'>
              <dl
                className={clsxm(
                  'grid gap-x-6 text-sm',
                  hasUserInfo && 'grid-cols-2'
                )}
              >
                <div>
                  <dt className='font-medium text-gray-900 dark:text-gray-50'>
                    Delivery address
                  </dt>
                  {hasUserInfo ? (
                    <dd className='mt-3 text-gray-500 dark:text-gray-400'>
                      <div className='relative'>
                        {order.address.snapshot_url && (
                          <Image
                            src={order.address.snapshot_url}
                            alt='Map'
                            width={200}
                            height={200}
                            className='rounded-md'
                          />
                        )}
                      </div>
                      <span className='mt-4 block'>{order.address.street}</span>
                      <span className='block'>{order.address.city}</span>
                      <span className='block'>
                        {order.address.state} {order.address.zip},{' '}
                        {order.address.country}
                      </span>
                    </dd>
                  ) : (
                    <p className='mt-4 rounded border border-dashed border-gray-100 p-4 dark:border-gray-800'>
                      Please <PrimaryLink href='/login'>sign in</PrimaryLink> to
                      view your delivery address or edit shipping details.
                    </p>
                  )}
                </div>
                {hasUserInfo && (
                  <div>
                    <dt className='font-medium text-gray-900 dark:text-gray-50'>
                      Shipping updates
                    </dt>
                    {order.expand?.recipient && (
                      <dd className='mt-3 space-y-3 text-gray-500 dark:text-gray-400'>
                        <p>{order.expand.recipient?.email}</p>
                        <p>{order.expand.recipient?.phone}</p>
                        <button
                          type='button'
                          className='font-medium text-indigo-600 hover:text-indigo-500'
                        >
                          Edit
                        </button>
                      </dd>
                    )}
                  </div>
                )}
              </dl>
            </div>
          </div>
          {/* @ts-ignore */}
          <OrderStatus orderStatuses={product.expand.status} />
        </div>
      ))}
    </div>
  );
};
