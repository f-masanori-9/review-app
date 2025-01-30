"use client";

import ClickAwayListener from "react-click-away-listener";
import { FC, useState } from "react";
import { useSignOut } from "@/hooks/useSignOut";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  const handleClickAway = () => {
    setOpenMenu(false);
  };

  const { signOut } = useSignOut();

  return (
    <div className="App">
      <div className="container mx-auto px-3">
        <header className="flex justify-between py-3">
          <h1>F</h1>
          {/* nav */}
          <ClickAwayListener
            onClickAway={openMenu ? handleClickAway : () => {}}
          >
            <div>
              <MenuButton handleMenuOpen={handleMenuOpen} openMenu={openMenu} />
              <nav
                className={
                  openMenu
                    ? "text-left fixed bg-slate-50 right-0 top-0 w-8/12 h-screen flex flex-col justify-start pt-8 px-3 ease-linear duration-300"
                    : "fixed right-[-100%] ease-linear duration-600"
                }
              >
                <ul
                  className="mt-6"
                  onClick={() => {
                    router.push("/notes");
                  }}
                >
                  ノート一覧
                </ul>
                <ul
                  className="mt-6"
                  onClick={() => {
                    router.push("/reviewNotes");
                  }}
                >
                  ノート復習
                </ul>
                <ul className="mt-6" onClick={() => signOut()}>
                  ログアウト
                </ul>
              </nav>
            </div>
          </ClickAwayListener>
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
