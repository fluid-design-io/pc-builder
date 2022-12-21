import { graphql } from "@graphql-ts/schema";
import { list } from "@keystone-6/core";
import { integer, relationship, text, select } from "@keystone-6/core/fields";
import { orderStatusOptions } from "../../lib/orderStatusOptions";
import { atTracking } from "../plugin/tracking/atTracking";
import { permissions } from "./access";

const withTracking = atTracking();

export const OrderStatus = list(
  withTracking({
    access: permissions.readOnly,
    ui: {
      isHidden: (context) => !permissions.canManageUsers(context),
    },
    fields: {
      order: relationship({
        ref: "Order",
      }),
      status: select({
        options: orderStatusOptions,
      }),
      description: text({
        ui: {
          displayMode: "textarea",
        },
      }),
    },
    hooks: {
      afterOperation: async ({ operation, context, item, resolvedData }) => {
        // Update the order status
        if (operation === "create") {
          console.log(item);
          await context.query.Order.updateOne({
            where: { id: item.orderId.toString() },
            data: { status: resolvedData.status },
          }).catch((err) => {
            console.error(err);
          });
        }
      },
    },
  })
);
