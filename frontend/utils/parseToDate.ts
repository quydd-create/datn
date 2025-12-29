// Parse dd/mm/yyyy to Date
export const parseDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    const [day, month, year] = dateString.split("/").map(Number);
    if (!day || !month || !year) return undefined;
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? undefined : date;
  };