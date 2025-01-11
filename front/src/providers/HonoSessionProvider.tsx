"use client";

import {
  SessionProvider,
  authConfigManager,
  useSession,
} from "@hono/auth-js/react";
import { createContext, ReactNode } from "react";

authConfigManager.setConfig({
  baseUrl: "http://localhost:8787",
  credentials: "include",
});

export const HonoSessionProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
