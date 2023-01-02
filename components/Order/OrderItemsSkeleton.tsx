import { LoadingSkeleton } from '@/core/LoadingSkeleton';

export const OrderItemsSkeleton = () => {
  return (
    <div className='card-secondary'>
      <div className='py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8'>
        <div className='sm:flex lg:col-span-7'>
          <div className='sm:aspect-none aspect-square w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-40 sm:w-40'>
            <LoadingSkeleton className='h-full w-full max-w-sm object-cover object-center sm:h-full sm:w-full' />
          </div>

          <div className='mt-6 w-full sm:mt-0 sm:ml-6'>
            <h3 className='text-xl font-medium text-gray-900'>
              <LoadingSkeleton className='w-1/3' />
            </h3>
            <p className='mt-2 text-sm font-medium text-gray-900'>
              <LoadingSkeleton className='w-3/4' />
            </p>
            <p className='mt-3 text-sm'>
              <LoadingSkeleton />
              <LoadingSkeleton className='w-4/5' />
            </p>
          </div>
        </div>

        <div className='mt-6 lg:col-span-5 lg:mt-0'>
          <dl className='grid grid-cols-2 gap-x-6 text-sm'>
            <div>
              <dt className='font-medium text-gray-900'>
                <LoadingSkeleton />
              </dt>
              <dd className='mt-3 text-gray-500'>
                <span className='block'>
                  <LoadingSkeleton />
                </span>
                <span className='block'>
                  <LoadingSkeleton className='w-2/3' />
                </span>
                <span className='block'>
                  <LoadingSkeleton className='w-1/3' />
                </span>
              </dd>
            </div>
            <div>
              <dt className='font-medium text-gray-900'>
                <LoadingSkeleton />
              </dt>

              <dd className='mt-3 space-y-3 text-gray-500'>
                <p>
                  <LoadingSkeleton />
                </p>
                <p>
                  <LoadingSkeleton className='w-3/5' />
                </p>
                <LoadingSkeleton className='w-12' />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export const OrderStatusSekelton = () => {
  return (
    <div className='border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8'>
      <h4 className='sr-only'>Status</h4>
      <p className='text-sm font-medium text-gray-900'>
        <LoadingSkeleton />
      </p>
      <div className='mt-6' aria-hidden='true'>
        <LoadingSkeleton className='h-2 overflow-hidden rounded-full bg-gray-200' />
        <div className='mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid'>
          <div>
            <LoadingSkeleton className='mx-auto w-16' />
          </div>
          <div>
            <LoadingSkeleton className='mx-auto w-16' />
          </div>
          <div>
            <LoadingSkeleton className='mx-auto w-16' />
          </div>
          <div>
            <LoadingSkeleton className='mx-auto w-16' />
          </div>
        </div>
      </div>
    </div>
  );
};
