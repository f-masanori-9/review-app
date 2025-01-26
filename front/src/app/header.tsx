"use client";

import ClickAwayListener from "react-click-away-listener";
import { useState } from "react";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  const handleClickAway = () => {
    setOpenMenu(false);
  };

  return (
    <div className="App">
      <div className="container mx-auto px-3">
        <header className="flex justify-between py-3">
          <h1>F</h1>

          <button
            onClick={handleMenuOpen}
            type="button"
            className="z-10 space-y-2 cursor-pointer w-8 h-10"
          >
            <div
              className={
                openMenu
                  ? "w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 transition duration-500 ease-in-out"
                  : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
              }
            />
            <div
              className={
                openMenu
                  ? "opacity-0 transition duration-500 ease-in-out"
                  : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
              }
            />
            <div
              className={
                openMenu
                  ? "w-8 h-0.5 bg-gray-600 -rotate-45 transition duration-500 ease-in-out"
                  : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
              }
            />
          </button>

          {/* nav */}
          <ClickAwayListener
            onClickAway={openMenu ? handleClickAway : () => {}}
          >
            <nav
              className={
                openMenu
                  ? "text-left fixed bg-slate-50 right-0 top-0 w-8/12 h-screen flex flex-col justify-start pt-8 px-3 ease-linear duration-300"
                  : "fixed right-[-100%] ease-linear duration-600"
              }
            >
              <ul className="mt-6">省略</ul>
            </nav>
          </ClickAwayListener>
        </header>
      </div>
    </div>
  );
};
