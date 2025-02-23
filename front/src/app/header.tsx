"use client";

import { useState } from "react";
import { useSignOut } from "@/hooks/useSignOut";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const Header = () => {
  const router = useRouter();
  const { status } = useSession();

  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };
  const handleClickAway = () => {
    setOpenMenu(false);
  };

  const { signOut } = useSignOut();

  return (
    <div className="App">
      <div className="container mx-auto px-3">
        <header
          className={`flex justify-between py-1 ${
            status === "unauthenticated" ? "pt-2" : ""
          }`}
        >
          <h1>F</h1>
          {status === "unauthenticated" && (
            <>
              <button
                className="text-primary"
                onClick={() => router.push("/login")}
              >
                登録/ログイン
              </button>
            </>
          )}
        </header>
      </div>
    </div>
  );
};
