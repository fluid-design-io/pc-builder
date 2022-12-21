import { list } from "@keystone-6/core";
import { checkbox, relationship, text } from "@keystone-6/core/fields";
import { permissions } from "./access";

export const Role = list({
  access: permissions.canManageUsers,
  ui: {
    isHidden: (context) => !permissions.canManageUsers(context),
  },
  fields: {
    name: text(),
    canManageContent: checkbox({
      defaultValue: false,
      label: "Can Manage Content - Trackings, Products, Orders",
    }),
    canManageUsers: checkbox({
      defaultValue: false,
      label: "Can Manage Users",
    }),
    users: relationship({ ref: "User.role", many: true }),
  },
});
