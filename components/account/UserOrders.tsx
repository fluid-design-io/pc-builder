/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { getAuth } from 'lib/auth';
import { BACKEND_URL } from 'lib/pb';
import { Fragment } from 'react';

import { LoadingSkeleton } from '@/core/LoadingSkeleton';
import ButtonLink from '@/links/ButtonLink';

const getOrderItems = async ({ auth, orderId }) => {
  if (!auth) return null;
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/collections/order_items/records?filter[order_id]=${orderId}&expand=status`,
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

const UserOrderItem = ({ product }) => {
  return (
    <li key={product.id} className='p-4 sm:p-6'>
      <div className='flex items-center sm:items-start'>
        <div className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-200 dark:border-gray-600/40 sm:h-16 sm:w-16'>
          <div className='h-full w-full object-cover object-center' />
        </div>
        <div className='ml-6 flex-1 text-sm'>
          <div className='font-medium text-gray-900 dark:text-gray-100 sm:flex sm:justify-between'>
            <h5>{product.name}</h5>
            <p className='mt-2 sm:mt-0'>${product.price / 100}</p>
          </div>
          <div className='mt-6 sm:flex sm:justify-between'>
            <div className='flex flex-1 items-center'>
              {product.expand?.status?.length > 0 && (
                <Fragment>
                  <CheckCircleIcon
                    className='h-5 w-5 text-green-500'
                    aria-hidden='true'
                  />
                  <p className='ml-1 text-sm font-medium text-gray-500 dark:text-gray-300'>
                    {
                      product.expand?.status[product.expand?.status.length - 1]
                        .status
                    }
                  </p>
                </Fragment>
              )}
            </div>

            <div className='mt-6 flex items-center space-x-4 divide-x divide-gray-100 border-t border-gray-100 pt-4 text-sm font-medium dark:divide-gray-600/40 dark:border-gray-600/40 sm:mt-0 sm:ml-4 sm:border-none sm:pt-0'>
              <div className='flex flex-1 justify-center'>
                <a
                  href={product.href}
                  className='whitespace-nowrap text-primary-600 hover:text-primary-500 dark:text-primary-400'
                >
                  Product support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const UserOrderItems = async ({ orderId }) => {
  const auth = getAuth();
  const orderItemsData = await getOrderItems({ auth, orderId });
  const orderItems = orderItemsData.items;

  return (
    <ul
      role='list'
      className='divide-y divide-gray-100 dark:divide-gray-600/40'
    >
      {orderItems.map((orderItem) => (
        <UserOrderItem key={`order-item-${orderItem.id}`} product={orderItem} />
      ))}
    </ul>
  );
};

export const UserOrders = async ({ promise }) => {
  const ordersData = await promise;
  const orders = ordersData?.items || [];
  if (!orders.length) return null;
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };
  return (
    <Fragment>
      {orders.map((order) => (
        <div
          key={`order-${order.id}`}
          className='card-secondary card-secondary-hover'
        >
          <h3 className='sr-only'>
            Order placed on{' '}
            <time dateTime={order.created}>{formatDate(order.created)}</time>
          </h3>

          <div className='flex items-center border-b border-gray-100 p-4 dark:border-gray-600/40 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6'>
            <dl className='grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2'>
              <div>
                <dt className='font-medium text-gray-900 dark:text-gray-100'>
                  Order number
                </dt>
                <dd className='mt-1 text-gray-500 dark:text-gray-300'>
                  {order.id}
                </dd>
              </div>
              <div className='hidden sm:block'>
                <dt className='font-medium text-gray-900 dark:text-gray-100'>
                  Date placed
                </dt>
                <dd className='mt-1 text-gray-500 dark:text-gray-300'>
                  <time dateTime={order.created}>
                    {formatDate(order.created)}
                  </time>
                </dd>
              </div>
              <div>
                <dt className='font-medium text-gray-900 dark:text-gray-100'>
                  Total amount
                </dt>
                <dd className='mt-1 font-medium text-gray-900 dark:text-gray-100'>
                  {/* {order.total} */}
                </dd>
              </div>
            </dl>

            <div className='flex lg:col-span-2 lg:items-center lg:justify-end lg:space-x-4'>
              <ButtonLink variant='dark' href={`/orders/${order.id}`}>
                <span>View Order</span>
                <span className='sr-only'>{order.id}</span>
              </ButtonLink>
            </div>
          </div>

          {/* Products */}
          <h4 className='sr-only'>Items</h4>
          {/* @ts-ignore */}
          <UserOrderItems orderId={order.id} />
        </div>
      ))}
    </Fragment>
  );
};

export const UserOrderSkeleton = () => (
  <div className='card-secondary'>
    <div className='flex items-center border-b border-gray-100 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6'>
      <dl className='grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2'>
        <div>
          <dt className='font-medium text-gray-900 dark:text-gray-100'>
            <LoadingSkeleton className='w-2/3' />
          </dt>
          <dd className='mt-1 text-gray-500 dark:text-gray-300'>
            <LoadingSkeleton className='w-1/2' />
          </dd>
        </div>
        <div className='hidden sm:block'>
          <dt className='font-medium text-gray-900 dark:text-gray-100'>
            <LoadingSkeleton className='w-7' />
          </dt>
          <dd className='mt-1 text-gray-500 dark:text-gray-300'>
            <LoadingSkeleton className='w-1/2' />
          </dd>
        </div>
        <div>
          <dt className='font-medium text-gray-900 dark:text-gray-100'>
            <LoadingSkeleton className='w-12' />
          </dt>
          <dd className='mt-1 font-medium text-gray-900 dark:text-gray-100'>
            <LoadingSkeleton className='w-7' />
          </dd>
        </div>
      </dl>

      <div className='flex lg:col-span-2 lg:items-center lg:justify-end lg:space-x-4'>
        <LoadingSkeleton className='w-8' />
      </div>
    </div>

    {/* Products */}
    <h4 className='sr-only'>Items</h4>
    <ul
      role='list'
      className='divide-y divide-gray-100 dark:divide-gray-600/40'
    >
      <li className='p-4 sm:p-6'>
        <div className='flex items-center sm:items-start'>
          <div className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-gray-200 dark:border-gray-600/40 sm:h-16 sm:w-16'>
            <div className='h-full w-full object-cover object-center' />
          </div>
          <div className='ml-6 flex-1 text-sm'>
            <div className='font-medium text-gray-900 dark:text-gray-100 sm:flex sm:justify-between'>
              <h5>
                <LoadingSkeleton className='w-24' />
              </h5>
              <p className='mt-2 sm:mt-0'>
                <LoadingSkeleton className='w-12' />
              </p>
            </div>
          </div>
        </div>

        <div className='mt-6 sm:flex sm:justify-between'>
          <div className='flex items-center'>
            <LoadingSkeleton className='w-8' />
            <p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-300'>
              <LoadingSkeleton className='w-16' />
            </p>
          </div>

          <div className='mt-6 flex items-center space-x-4 divide-x divide-gray-100 border-t border-gray-100 pt-4 text-sm font-medium dark:divide-gray-600/40 dark:border-gray-600/40 sm:mt-0 sm:ml-4 sm:border-none sm:pt-0'>
            <div className='flex flex-1 justify-center'>
              <LoadingSkeleton className='w-24' />
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
);
