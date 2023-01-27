export type FetchOptions = {
  method: string;
  headers?: { "Content-Type": string };
  body: string | FormData;
};
