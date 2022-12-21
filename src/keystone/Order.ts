import { graphql } from "@graphql-ts/schema";
import { list } from "@keystone-6/core";
import {
  timestamp,
  relationship,
  text,
  select,
  virtual,
} from "@keystone-6/core/fields";
import { atTracking } from "../plugin/tracking/atTracking";
import { permissions } from "./access";

const withTracking = atTracking();

export const Order = list(
  withTracking({
    access: permissions.readOnly,
    ui: {
      isHidden: (context) => !permissions.canManageUsers(context),
    },
    fields: {
      name: text(),
      description: text(),
      status: text({
        ui: {
          itemView: {
            fieldMode: "read",
          },
          listView: {
            fieldMode: "read",
          },
          description: "To change the status, go to the Order Status tab",
        },
      }),
      user: relationship({
        ref: "User.orders",
      }),
      items: relationship({
        ref: "OrderItem.order",
        many: true,
      }),
      deliveryDate: timestamp({
        validation: { isRequired: true },
      }),
      recipient: relationship({
        ref: "User",
      }),
      address: relationship({
        ref: "Address",
      }),
      total: virtual({
        field: graphql.field({
          type: graphql.Int,
          resolve: async (item, args, context) => {
            /* @ts-ignore */
            const itemTotal = await context.query.OrderItem.findMany({
              where: { order: { id: { equals: item.id.toString() } } },
              query: "total",
            });
            return itemTotal.reduce((tally, orderItem) => {
              return tally + orderItem.total;
            }, 0);
          },
        }),
      }),
    },
    hooks: {
      validateInput: async ({
        resolvedData,
        item,
        inputData,
        addValidationError,
      }) => {
        if (resolvedData.deliveryDate < new Date()) {
          addValidationError("Delivery date must be in the future");
        }
        // recipient and address must be set
        if (!item.recipientId && !resolvedData.recipient) {
          addValidationError("Recipient is required");
        }
        if (!item.addressId && !resolvedData.address) {
          addValidationError("Address is required");
        }
      },
      afterOperation: async ({ operation, context, item }) => {
        if (operation === "create") {
          // create a new order status
          await context.query.OrderStatus.createOne({
            data: {
              order: { connect: { id: item.id } },
              status: item.status,
            },
          });
        }
        if (operation === "delete") {
          // delete all order status
          const orderStatuses = await context.query.OrderStatus.findMany({
            /* @ts-ignore */
            where: { order: { id: { equals: item.id.toString() } } },
            query: "id",
          });
          await context.query.OrderStatus.deleteMany({
            where: orderStatuses.map((orderStatus) => ({
              id: orderStatus.id,
            })),
          });
        }
      },
    },
  })
);
