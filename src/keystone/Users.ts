import { atTracking } from "../plugin/tracking/atTracking";
import { list } from "@keystone-6/core";
import { permissions } from "./";
import { password, relationship, text } from "@keystone-6/core/fields";

const withTracking = atTracking();

export const User = list(
  withTracking({
    access: permissions.canManageUsers,
    ui: {
      isHidden: (context) => !permissions.canManageUsers(context),
    },
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        access: {
          // email only visible to authenticated users
          read: permissions.authenticatedUser,
        },
      }),
      password: password({
        hooks: {
          validateInput: async ({
            resolvedData,
            operation,
            addValidationError,
            item,
          }) => {
            if (
              operation === "update" &&
              !item.password &&
              !resolvedData.password
            ) {
              addValidationError("Password is required");
            }
          },
        },
      }),
      role: relationship({
        ref: "Role.users",
        access: permissions.canManageUsers,
      }),
      orders: relationship({
        ref: "Order.user",
        many: true,
        ui: {
          itemView: { fieldMode: "read" },
        },
      }),
      address: relationship({
        ref: "Address.user",
        many: true,
        ui: {
          itemView: { fieldMode: "read" },
        },
      }),
    },
  })
);
