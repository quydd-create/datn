export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

// Helper functions
export const getGenderLabel = (gender: Gender): string => {
  const labels: Record<Gender, string> = {
    [Gender.MALE]: "Nam",
    [Gender.FEMALE]: "Nữ",
    [Gender.OTHER]: "Khác",
  };
  return labels[gender];
};

export const getAllGenders = (): Array<{ value: Gender; label: string }> => {
  return Object.values(Gender).map((gender) => ({
    value: gender,
    label: getGenderLabel(gender),
  }));
};