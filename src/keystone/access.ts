import { allowAll, denyAll, allOperations } from "@keystone-6/core/access";

export const isAuhtenticated = ({ session }: any) => {
  return !!session?.data;
};

export const permissions = {
  authenticatedUser: isAuhtenticated,
  public: () => true,
  readOnly: {
    operation: {
      // deny create/read/update/delete
      ...allOperations(isAuhtenticated ? allowAll : denyAll),
      // override the deny and allow only query
      query: allowAll,
    },
  },
  canManageContent: ({ session }: any) => {
    return !!session?.data.role?.canManageContent;
  },
  canManageUsers: ({ session }: any) => {
    return !!session?.data.role?.canManageUsers;
  },
};

export const rules = {
  canManageUserList: ({ session }: any) => {
    if (permissions.canManageUsers({ session })) return true;
    if (!isAuhtenticated({ session })) return false;
    return {
      id: {
        equals: session!.itemId,
      },
    };
  },
};
