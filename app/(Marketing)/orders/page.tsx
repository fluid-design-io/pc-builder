import { gql } from "graphql-request";
import { client } from "../../src/util/request";
const queryOrder = gql`
  query QUERY_ORDERS {
    orders {
      id
    }
  }
`;
export default async function Page() {
  const { orders } = await client.request(queryOrder);
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>{order.id}</div>
      ))}
    </div>
  );
}
