"use client";
import { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";

export const HonoSessionProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
