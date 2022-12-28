/* eslint-disable @typescript-eslint/ban-ts-comment */
import { gql } from "graphql-request";
import { Suspense } from "react";

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

const fetchOrder = async ({ id }) =>
  client
    .request(queryOrder, { id })
    .then((data) => data.order)
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
  return (
    <main className='order-layout-wrap'>
      <section className='order-layout relative grid-cols-1 items-start md:grid-cols-5'>
        <OrderInfo order={order} />
        <Suspense fallback={<p>Loading timeline...</p>}>
          {/* @ts-ignore */}
          <OrderTimeline
            id={id}
            currentStatus={order.status}
            deliveryDate={order.deliveryDate}
          />
        </Suspense>
      </section>
    </main>
  );
}
