export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DISCONTINUED = "discontinued",
}

// Helper functions
export const getProductStatusLabel = (status: ProductStatus): string => {
  const labels: Record<ProductStatus, string> = {
    [ProductStatus.ACTIVE]: "Hoạt động",
    [ProductStatus.INACTIVE]: "Không hoạt động",
    [ProductStatus.DISCONTINUED]: "Ngừng kinh doanh",
  };
  return labels[status];
};

export const getProductStatusColor = (status: ProductStatus): string => {
  const colors: Record<ProductStatus, string> = {
    [ProductStatus.ACTIVE]: "green",
    [ProductStatus.INACTIVE]: "yellow",
    [ProductStatus.DISCONTINUED]: "red",
  };
  return colors[status];
};

export const getProductStatusBadgeClass = (status: ProductStatus): string => {
  const classes: Record<ProductStatus, string> = {
    [ProductStatus.ACTIVE]: "bg-green-100 text-green-800 border-green-200",
    [ProductStatus.INACTIVE]: "bg-yellow-100 text-yellow-800 border-yellow-200",
    [ProductStatus.DISCONTINUED]: "bg-red-100 text-red-800 border-red-200",
  };
  return classes[status];
};

export const getAllProductStatuses = (): Array<{
  value: ProductStatus;
  label: string;
  color: string;
}> => {
  return Object.values(ProductStatus).map((status) => ({
    value: status,
    label: getProductStatusLabel(status),
    color: getProductStatusColor(status),
  }));
};