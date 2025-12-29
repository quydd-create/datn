export enum Pom {
  HO_CHI_MINH = "ho_chi_minh",
  HA_NOI = "ha_noi",
  DA_NANG = "da_nang",
  VINH_LONG = "vinh_long",
  CAN_THO = "can_tho",
  LAM_DONG = "lam_dong",
  HUE = "hue",
  AN_GIANG = "an_giang",
  HAI_PHONG = "hai_phong",
  DONG_THAP = "dong_thap",
}

// Helper functions
export const getPomLabel = (pom: Pom): string => {
  const labels: Record<Pom, string> = {
    [Pom.HO_CHI_MINH]: "TP. Hồ Chí Minh",
    [Pom.HA_NOI]: "Hà Nội",
    [Pom.DA_NANG]: "Đà Nẵng",
    [Pom.VINH_LONG]: "Vĩnh Long",
    [Pom.CAN_THO]: "Cần Thơ",
    [Pom.LAM_DONG]: "Lâm Đồng",
    [Pom.HUE]: "Huế",
    [Pom.AN_GIANG]: "An Giang",
    [Pom.HAI_PHONG]: "Hải Phòng",
    [Pom.DONG_THAP]: "Đồng Tháp",
  };
  return labels[pom];
};

export const getAllPoms = (): Array<{ value: Pom; label: string }> => {
  return Object.values(Pom).map((pom) => ({
    value: pom,
    label: getPomLabel(pom),
  }));
};