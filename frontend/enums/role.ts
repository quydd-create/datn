export enum Role {
  ADMIN = "admin",
  SELLER = "seller",
  BUYER = "buyer",
  ANY = "any", // Represents any authenticated user
}

// Helper functions
export const getRoleLabel = (role: Role): string => {
  const labels: Record<Role, string> = {
    [Role.ADMIN]: "Quản trị viên",
    [Role.SELLER]: "Người bán",
    [Role.BUYER]: "Người mua",
    [Role.ANY]: "Người dùng",
  };
  return labels[role];
};

export const getRoleBadgeClass = (role: Role): string => {
  const classes: Record<Role, string> = {
    [Role.ADMIN]: "bg-purple-100 text-purple-800 border-purple-200",
    [Role.SELLER]: "bg-blue-100 text-blue-800 border-blue-200",
    [Role.BUYER]: "bg-green-100 text-green-800 border-green-200",
    [Role.ANY]: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return classes[role];
};

export const getAllRoles = (): Array<{
  value: Role;
  label: string;
}> => {
  return Object.values(Role).map((role) => ({
    value: role,
    label: getRoleLabel(role),
  }));
};