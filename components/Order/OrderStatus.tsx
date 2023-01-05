import clsxm from 'lib/clsxm';
import { Suspense } from 'react';

import { OrderStatusSekelton } from './OrderItemsSkeleton';

export const OrderStatus = async ({ className = '', orderStatuses }) => {
  if (!orderStatuses)
    return <h4 className='w-full text-center'>Order Statuses not found</h4>;
  const progress = orderStatuses.length;
  const activeStyles = 'text-primary-600 dark:text-primary-400';
  return (
    <div
      className={clsxm(
        'border-t border-gray-200 py-6 px-4 dark:border-gray-700 sm:px-6 lg:p-8',
        className
      )}
    >
      <h4 className='sr-only'>Status</h4>
      <Suspense fallback={<OrderStatusSekelton />}>
        <p className='text-sm font-medium'>
          {orderStatuses[0].status} on{' '}
          <time dateTime={orderStatuses[0].updated}>
            {new Date(orderStatuses[0].updated).toLocaleString()}
          </time>
        </p>
        <div className='mt-6' aria-hidden='true'>
          <div className='overflow-hidden rounded-full bg-gray-200'>
            <div
              className='h-2 rounded-full bg-primary-600 dark:bg-primary-500'
              style={{
                width: `calc((${progress} * 2) / 10 * 100%)`,
              }}
            />
          </div>
          <div className='mt-6 hidden grid-cols-5 text-sm font-medium text-gray-600 dark:text-gray-400 sm:grid'>
            <div className={activeStyles}>Order placed</div>
            <div className={clsxm('text-center', progress > 1 && activeStyles)}>
              {orderStatuses[1]?.status || 'Processing'}
            </div>
            <div className={clsxm('text-center', progress > 2 && activeStyles)}>
              {orderStatuses[2]?.status || 'Building'}
            </div>
            <div className={clsxm('text-center', progress > 3 && activeStyles)}>
              {orderStatuses[3]?.status || 'Testing'}
            </div>
            <div className={clsxm('text-right', progress > 4 && activeStyles)}>
              {orderStatuses[4]?.status || 'Shipped'}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};
