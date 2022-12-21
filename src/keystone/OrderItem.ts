import { graphql } from "@graphql-ts/schema";
import { list } from "@keystone-6/core";
import { integer, relationship, text, virtual } from "@keystone-6/core/fields";
import { permissions } from "./access";

export const OrderItem = list({
  access: permissions.readOnly,
  ui: {
    isHidden: (context) => !permissions.canManageUsers(context),
  },
  fields: {
    name: text(),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    order: relationship({
      ref: "Order.items",
    }),
    price: integer(),
    quantity: integer({
      defaultValue: 1,
    }),
    total: virtual({
      field: graphql.field({
        type: graphql.Int,
        resolve: async (item) => {
          return (item.price as number) * (item.quantity as number);
        },
      }),
    }),
  },
});
