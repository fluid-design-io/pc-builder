import { Timeline } from './Timeline';
import { CopyOrderIdBtn } from './CopyOrderIdBtn';
import { OrderDeliveryInfo } from './OrderDeliveryInfo';

export const OrderTimeline = async ({ id, currentStatus, deliveryDate }) => {
  const orderStatuses = undefined;
  if (!orderStatuses) {
    return null;
  }
  return (
    <div className='w-full px-4 md:col-span-2 md:px-6 lg:px-8'>
      <OrderDeliveryInfo
        deliveryDate={deliveryDate}
        status={currentStatus}
        className='mb-10 mt-2 md:hidden'
      />
      <div className='flex flex-col-reverse md:flex-col'>
        <div className='mb-10 md:mb-14 lg:mb-16'>
          <h2 className='mb-2 text-sm font-bold uppercase'>Tracking ID</h2>
          <CopyOrderIdBtn id={id} />
        </div>
        <Timeline statuses={orderStatuses} currentStatus={currentStatus} />
      </div>
    </div>
  );
};
