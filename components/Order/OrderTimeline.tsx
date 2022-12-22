import { gql } from "graphql-request";

import { Timeline } from "./Timeline";
import { CopyOrderIdBtn } from "./CopyOrderIdBtn";
import { OrderDeliveryInfo } from "./OrderDeliveryInfo";
import { client } from "../../src/util/request";

const queryOrderStatuses = gql`
  query QUERY_ORDER_STATUSES($id: ID!) {
    orderStatuses(
      where: { order: { id: { equals: $id } } }
      orderBy: { createdAt: asc }
    ) {
      id
      status
      description
      createdAt
    }
  }
`;

const fetchOrderStatuses = async ({ id }) =>
  client
    .request(queryOrderStatuses, { id })
    .then((data) => data.orderStatuses)
    .catch((err) => {
      console.log(err);
    });

export const OrderTimeline = async ({ id, currentStatus, deliveryDate }) => {
  const orderStatuses = (await fetchOrderStatuses({ id })) as any;
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
