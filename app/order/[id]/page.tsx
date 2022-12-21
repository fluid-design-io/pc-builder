import { gql } from "graphql-request";
import { OrderInfo } from "../../../components/Order/OrderInfo";
import { OrderNotFound } from "../../../components/Order/OrderNotFound";
import { OrderTimeline } from "../../../components/Order/OrderTimeline";

import { client } from "../../../src/util/request";

const queryOrder = gql`
  query QUERY_ORDER($id: ID!) {
    order(where: { id: $id }) {
      id
      name
      description
      status
      deliveryDate
      address {
        id
        street
        city
        state
        zip
        country
        geolocation
      }
      items {
        id
        name
        description
        price
        quantity
      }
      createdAt
      createdAt
      total
    }
  }
`;

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

const fetchOrder = async ({ id }) =>
  client
    .request(queryOrder, { id })
    .then((data) => data.order)
    .catch((err) => {
      console.log(err);
    });

const fetchOrderStatuses = async ({ id }) =>
  client
    .request(queryOrderStatuses, { id })
    .then((data) => data.orderStatuses)
    .catch((err) => {
      console.log(err);
    });

export default async function Page({ params: { id } }) {
  const order = (await fetchOrder({ id })) as any;
  if (!order) {
    return (
      <main className='order-layout-wrap'>
        <section className='order-layout'>
          <OrderNotFound id={id} />
        </section>
      </main>
    );
  }
  const orderStatuses = (await fetchOrderStatuses({ id })) as any;
  return (
    <main className='order-layout-wrap'>
      <section className='order-layout relative grid-cols-1 md:grid-cols-5 items-start'>
        <OrderInfo order={order} />
        <OrderTimeline
          id={id}
          statuses={orderStatuses}
          currentStatus={order.status}
          deliveryDate={order.deliveryDate}
        />
      </section>
    </main>
  );
}
