"use client";

import { Loading } from "@/components/Loading";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("AuthGuard", pathname);

    if (pathname === "/") return;
    if (pathname === "/login") return;

    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
  }, [session, status, router, pathname]);

  if (status === "loading") return <Loading />;

  if (!session) {
    if (pathname === "/login") return <>{children}</>;
    if (pathname === "/") return <>{children}</>;
    return <Loading />;
  }

  return <>{children}</>;
};
