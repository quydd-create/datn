// Export all enums
export * from './brand';
export * from './gender';
export * from './productCategory';
export * from './productStatus';
export * from './pom';
export * from './role';
export * from './userStatus';

// Type definitions for common enum operations
export type EnumOption<T> = {
  value: T;
  label: string;
};

export type EnumWithIcon<T> = EnumOption<T> & {
  icon: string;
};

export type EnumWithColor<T> = EnumOption<T> & {
  color: string;
};

// Utility type for enum values
export type EnumValues<T> = T[keyof T];