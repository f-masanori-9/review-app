"use client";

import { Button } from "@headlessui/react";
import { FC } from "react";
import { BsPlus } from "react-icons/bs";

export const AddNoteButton: FC<{
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
}> = ({ onClick, isLoading }) => {
  return (
    <Button
      className="flex items-center pr-1 bg-white border-primary border-2 rounded-md justify-between"
      onClick={onClick}
      disabled={isLoading}
    >
      <BsPlus
        className="border-primary  rounded-md border-none"
        color="#06b6d4"
        size={28}
      />
      <div className="flex-grow-0">
        <span className="text-primary text-md font-bold">ノート</span>
      </div>
    </Button>
  );
};
