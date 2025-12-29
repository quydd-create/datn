export enum Brand {
  GUCCI = "gucci",
  SAMSUNG = "samsung",
  LOUIS_VUITTON = "louis_vuitton",
  PHONE = "phone",
  CHANEL = "chanel",
  WAVE = "wave",
  ADIDAS = "adidas",
  DUY_TAN = "duy_tan",
  PUMA = "puma",
  VISION = "vision",
}

// Helper functions
export const getBrandLabel = (brand: Brand): string => {
  const labels: Record<Brand, string> = {
    [Brand.GUCCI]: "Gucci",
    [Brand.SAMSUNG]: "Samsung",
    [Brand.LOUIS_VUITTON]: "Louis Vuitton",
    [Brand.PHONE]: "Phone",
    [Brand.CHANEL]: "Chanel",
    [Brand.WAVE]: "Wave",
    [Brand.ADIDAS]: "Adidas",
    [Brand.DUY_TAN]: "Duy Tân",
    [Brand.PUMA]: "Puma",
    [Brand.VISION]: "Vision",
  };
  return labels[brand];
};

export const getAllBrands = (): Array<{ value: Brand; label: string }> => {
  return Object.values(Brand).map((brand) => ({
    value: brand,
    label: getBrandLabel(brand),
  }));
};