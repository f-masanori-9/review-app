"use client";
import { ReactNode } from "react";

import { SessionProvider, authConfigManager } from "@hono/auth-js/react";

authConfigManager.setConfig({
  baseUrl: "http://localhost:8787",
  credentials: "include",
});

export const HonoSessionProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
