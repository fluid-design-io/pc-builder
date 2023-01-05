import UnderlineLink from '@/links/UnderlineLink';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';

export const OrderNotFound = () => {
  return (
    <div className='text-center'>
      <MagnifyingGlassCircleIcon className='mx-auto h-12 w-12 text-gray-400 md:h-16 md:w-16' />
      <h1 className='mb-4'>Order not found</h1>
      <p>
        Order does not exist. Please check your order number and try again.
        <br />
        <UnderlineLink href='/' className='mt-4'>
          Go back to home
        </UnderlineLink>
      </p>
    </div>
  );
};
