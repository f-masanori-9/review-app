"use client";

import { FC, useState } from "react";
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

const MenuButton: FC<{
  handleMenuOpen: () => void;
  openMenu: boolean;
}> = ({ handleMenuOpen, openMenu }) => {
  return (
    <button
      onClick={handleMenuOpen}
      type="button"
      className="z-10 space-y-2 cursor-pointer w-8 h-10"
    >
      <div
        className={
          openMenu
            ? "w-8 h-0.5 bg-primary translate-y-2.5 rotate-45 transition duration-500 ease-in-out"
            : "w-8 h-0.5 bg-primary transition duration-500 ease-in-out"
        }
      />
      <div
        className={
          openMenu
            ? "opacity-0 bg-primary transition duration-500 ease-in-out"
            : "w-8 h-0.5 bg-primary transition duration-500 ease-in-out"
        }
      />
      <div
        className={
          openMenu
            ? "w-8 h-0.5 bg-primary -rotate-45 transition duration-500 ease-in-out"
            : "w-8 h-0.5 bg-primary transition duration-500 ease-in-out"
        }
      />
    </button>
  );
};
