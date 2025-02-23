"use client";

import { FC } from "react";
import { BsPlus } from "react-icons/bs";
export const AddSubNoteButton: FC<{
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ onClick }) => {
  return (
    <div
      className="flex items-center  p-1 border-primary border-2 rounded-md"
      onClick={onClick}
    >
      <BsPlus
        className="border-primary bg-white rounded-md border-none"
        color="#06b6d4"
        size={32}
      />
      <div className="flex-grow-0">
        <span className="text-primary text-md font-bold">サブノート追加</span>
      </div>
    </div>
  );
};
