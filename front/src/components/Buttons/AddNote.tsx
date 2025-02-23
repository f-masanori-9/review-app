"use client";

import { FC } from "react";
import { CiSquarePlus } from "react-icons/ci";

export const AddNoteButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div>
      <CiSquarePlus
        onClick={onClick}
        className="border-primary bg-white"
        color="#06b6d4"
        size={52}
      />
    </div>
  );
};
