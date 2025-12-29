export enum ProductCategory {
  ELECTRONICS = "electronics",
  VEHICLES = "evehicles",
  MEN_FASHION = "men_fashion",
  WOMEN_FASHION = "women_fashion",
  HOUSEHOLD = "household",
  BAGS = "bags",
  HANDMADE = "handmade",
  GLASSES = "glasses",
  FOOTWEAR = "footwear",
  COATS = "coats",
}

// Helper functions
export const getCategoryLabel = (category: ProductCategory): string => {
  const labels: Record<ProductCategory, string> = {
    [ProductCategory.ELECTRONICS]: "Điện tử",
    [ProductCategory.VEHICLES]: "Phương tiện",
    [ProductCategory.MEN_FASHION]: "Thời trang nam",
    [ProductCategory.WOMEN_FASHION]: "Thời trang nữ",
    [ProductCategory.HOUSEHOLD]: "Đồ gia dụng",
    [ProductCategory.BAGS]: "Túi xách",
    [ProductCategory.HANDMADE]: "Thủ công",
    [ProductCategory.GLASSES]: "Kính mắt",
    [ProductCategory.FOOTWEAR]: "Giày dép",
    [ProductCategory.COATS]: "Áo khoác",
  };
  return labels[category];
};

export const getCategoryIcon = (category: ProductCategory): string => {
  const icons: Record<ProductCategory, string> = {
    [ProductCategory.ELECTRONICS]: "📱",
    [ProductCategory.VEHICLES]: "🚗",
    [ProductCategory.MEN_FASHION]: "👔",
    [ProductCategory.WOMEN_FASHION]: "👗",
    [ProductCategory.HOUSEHOLD]: "🏠",
    [ProductCategory.BAGS]: "👜",
    [ProductCategory.HANDMADE]: "🎨",
    [ProductCategory.GLASSES]: "👓",
    [ProductCategory.FOOTWEAR]: "👟",
    [ProductCategory.COATS]: "🧥",
  };
  return icons[category];
};

export const getAllCategories = (): Array<{
  value: ProductCategory;
  label: string;
  icon: string;
}> => {
  return Object.values(ProductCategory).map((category) => ({
    value: category,
    label: getCategoryLabel(category),
    icon: getCategoryIcon(category),
  }));
};