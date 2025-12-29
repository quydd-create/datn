export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BANNED = "banned",
}

// Helper functions
export const getUserStatusLabel = (status: UserStatus): string => {
  const labels: Record<UserStatus, string> = {
    [UserStatus.ACTIVE]: "Hoạt động",
    [UserStatus.INACTIVE]: "Không hoạt động",
    [UserStatus.BANNED]: "Bị cấm",
  };
  return labels[status];
};

export const getUserStatusColor = (status: UserStatus): string => {
  const colors: Record<UserStatus, string> = {
    [UserStatus.ACTIVE]: "green",
    [UserStatus.INACTIVE]: "yellow",
    [UserStatus.BANNED]: "red",
  };
  return colors[status];
};

export const getUserStatusBadgeClass = (status: UserStatus): string => {
  const classes: Record<UserStatus, string> = {
    [UserStatus.ACTIVE]: "bg-green-100 text-green-800 border-green-200",
    [UserStatus.INACTIVE]: "bg-yellow-100 text-yellow-800 border-yellow-200",
    [UserStatus.BANNED]: "bg-red-100 text-red-800 border-red-200",
  };
  return classes[status];
};

export const canUserPerformAction = (status: UserStatus): boolean => {
  return status === UserStatus.ACTIVE;
};

export const getAllUserStatuses = (): Array<{
  value: UserStatus;
  label: string;
  color: string;
  canPerformAction: boolean;
}> => {
  return Object.values(UserStatus).map((status) => ({
    value: status,
    label: getUserStatusLabel(status),
    color: getUserStatusColor(status),
    canPerformAction: canUserPerformAction(status),
  }));
};