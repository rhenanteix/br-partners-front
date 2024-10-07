/* eslint-disable @typescript-eslint/no-explicit-any */
export type TResponseBase<T> = {
  status?: number;
  message?: string;
  data?: T;
};
