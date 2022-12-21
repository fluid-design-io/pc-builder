import { InformationCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { OrderDeliveryInfo } from "./OrderDeliveryInfo";
import { OrderItem } from "./OrderItem";
import { ShippingMap } from "./ShippingMap";

export const OrderInfo = ({ order }) => {
  const { name, deliveryDate, status, address, items } = order;
  const { street, city, state, zip, country, geolocation } = address;

  return (
    <div className='md:col-span-3 flex flex-col gap-4 order-last md:order-first w-full'>
      <OrderDeliveryInfo
        status={status}
        deliveryDate={deliveryDate}
        className='hidden md:block'
      />
      <div className='card'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='uppercase font-semibold text-sm flex justify-start items-center gap-2 mb-0'>
            <InformationCircleIcon className='w-4 h-4' />
            Order Info
          </h2>
          <span>{name}</span>
        </div>
        <ul
          role='list'
          className='divide-y divide-gray-200 dark:divide-gray-700 text-sm font-medium'
        >
          {items.map((item) => (
            <OrderItem item={item} key={item.id} />
          ))}
        </ul>
        <dl className='space-y-6 border-t border-gray-200 dark:border-gray-600 pt-6 text-sm font-medium text-gray-500'>
          <div className='flex justify-between'>
            <dt className='text-gray-700 dark:text-gray-300'>Subtotal</dt>
            <dd className='text-gray-900 dark:text-gray-100'>
              ${order.total / 100}
            </dd>
          </div>

          <div className='flex justify-between'>
            <dt className='text-gray-700 dark:text-gray-300'>Shipping</dt>
            <dd className='text-gray-900 dark:text-gray-100'>$0.00</dd>
          </div>

          {/* <div className='flex justify-between'>
            <dt className='text-gray-700 dark:text-gray-300'>Taxes</dt>
            <dd className='text-gray-900 dark:text-gray-100'>$6.40</dd>
          </div> */}

          <div className='flex items-center justify-between border-t border-gray-200 dark:border-gray-600 pt-6 text-gray-900 dark:text-gray-100'>
            <dt className='text-base'>Total</dt>
            <dd className='text-base'>${order.total / 100}</dd>
          </div>
        </dl>
      </div>
      <div className='card flex justify-between items-start gap-4'>
        <div className=''>
          <h2 className='uppercase font-semibold text-sm flex justify-start items-center gap-2 mb-4'>
            <MapPinIcon className='w-4 h-4' />
            Shipping Info
          </h2>
          <p>
            {street}
            <br />
            {city}, {state}, {zip}, {country}
          </p>
        </div>
        <ShippingMap geolocation={geolocation} />
      </div>
    </div>
  );
};
