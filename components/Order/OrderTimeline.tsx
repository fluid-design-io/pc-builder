import { Timeline } from "./Timeline";
import { CopyOrderIdBtn } from "./CopyOrderIdBtn";
import { OrderDeliveryInfo } from "./OrderDeliveryInfo";

export const OrderTimeline = ({
  id,
  statuses,
  currentStatus,
  deliveryDate,
}) => {
  return (
    <div className='md:col-span-2 px-4 md:px-6 lg:px-8 w-full'>
      <OrderDeliveryInfo
        deliveryDate={deliveryDate}
        status={currentStatus}
        className='md:hidden mb-10 mt-2'
      />
      <div className='flex md:flex-col flex-col-reverse'>
        <div className='mb-10 md:mb-14 lg:mb-16'>
          <h2 className='uppercase font-bold text-sm mb-2'>Tracking ID</h2>
          <CopyOrderIdBtn id={id} />
        </div>
        <Timeline statuses={statuses} currentStatus={currentStatus} />
      </div>
    </div>
  );
};
