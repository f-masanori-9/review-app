"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { FC } from "react";

export const DropDownMenu: FC<{
  menuButtonChildren: React.ReactNode;
  items: {
    key: string;
    children: React.ReactNode;
    onClick: () => void;
  }[];
}> = ({ menuButtonChildren, items }) => {
  return (
    <Menu>
      <MenuButton>{menuButtonChildren}</MenuButton>
      <MenuItems
        anchor="bottom"
        className="bg-white p-1 rounded-md border-[1px]"
      >
        {items.map(({ key, children, onClick }) => {
          return (
            <MenuItem key={key}>
              <div
                className="flex items-center gap-1"
                onClick={() => {
                  onClick();
                }}
              >
                {children}
              </div>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};
