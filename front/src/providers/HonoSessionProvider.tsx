"use client";
import { ReactNode } from "react";

import { SessionProvider, authConfigManager } from "@hono/auth-js/react";

authConfigManager.setConfig({
  baseUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}`,
  credentials: "include",
});

export const HonoSessionProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
