import { Hono } from "hono";
import { hc } from "hono/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateApiClient = <T extends Hono<any, any, any>>() => {
  return hc<T>("http://localhost:8787", {
    fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
      return fetch(input, {
        ...requestInit,
        credentials: "include", // NOTE: cookieに認証情報を含める
      });
    },
  });
};
