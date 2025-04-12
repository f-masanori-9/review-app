import { EndPointType } from "@/app/api/[...route]/route";
import { hc } from "hono/client";

export const apiClient = hc<EndPointType>;
export const generateApiClient = () => {
  return apiClient(`${process.env.NEXT_PUBLIC_ENDPOINT}`, {
    fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
      return fetch(input, {
        ...requestInit,
        credentials: "include", // NOTE: cookieに認証情報を含める
      });
    },
  });
};
