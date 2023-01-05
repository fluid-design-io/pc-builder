import clsxm from 'lib/clsxm';

export const FullWidthBackground = () => {
  return (
    <div
      aria-hidden='true'
      className={clsxm(
        'top-0 h-72',
        'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0'
      )}
    >
      <div className='absolute inset-0 flex'>
        <div className='h-full w-1/2 bg-primary-400 dark:bg-primary-700' />
        <div className='h-full w-1/2 bg-primary-300 dark:bg-primary-600' />
      </div>
      <div className='relative flex justify-center'>
        <svg
          className='flex-shrink-0'
          width={1750}
          height={308}
          viewBox='0 0 1750 308'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M284.161 308H1465.84L875.001 182.413 284.161 308z'
            className='fill-primary-200 dark:fill-primary-600'
          />
          <path
            d='M1465.84 308L16.816 0H1750v308h-284.16z'
            className='fill-primary-300 dark:fill-primary-600'
          />
          <path
            d='M1733.19 0L284.161 308H0V0h1733.19z'
            className='fill-primary-400 dark:fill-primary-700'
          />
          <path
            d='M875.001 182.413L1733.19 0H16.816l858.185 182.413z'
            className='fill-primary-500 dark:fill-primary-900'
          />
        </svg>
      </div>
    </div>
  );
};
