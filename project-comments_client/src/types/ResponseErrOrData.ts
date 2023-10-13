export type ResponseErrOrData<T> = {
  data?: T;
  error?: string;
}