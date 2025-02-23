"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FC } from "react";

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
      <MenuItems anchor="bottom">
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
