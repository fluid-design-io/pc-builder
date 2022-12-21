import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const OrderNotFound = ({ id }) => {
  return (
    <div className='text-center'>
      <MagnifyingGlassCircleIcon className='w-12 md:w-16 h-12 md:h-16 mx-auto text-gray-400' />
      <h1>Order not found</h1>
      <p>
        Order {id} does not exist. Please check your order number and try again.
        <br />
        <Link href='/' className='link-primary'>
          Go back to home
        </Link>
      </p>
    </div>
  );
};
