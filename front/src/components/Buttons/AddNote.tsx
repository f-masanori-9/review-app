"use client";

import { FC } from "react";
import { CiSquarePlus } from "react-icons/ci";

export const AddNoteButton: FC<{
  onClick: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}> = ({ onClick }) => {
  return (
    <div>
      <CiSquarePlus
        onClick={onClick}
        className="border-primary bg-white rounded-md"
        color="#06b6d4"
        size={44}
        viewBox="3 3 18 18"
      />
    </div>
  );
};
