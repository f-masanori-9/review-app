import { honoClient } from "backend/index";

export const generateApiClient = () => {
  return honoClient(`${process.env.NEXT_PUBLIC_ENDPOINT}`, {
    fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
      return fetch(input, {
        ...requestInit,
        credentials: "include", // NOTE: cookieに認証情報を含める
      });
    },
  });
};
