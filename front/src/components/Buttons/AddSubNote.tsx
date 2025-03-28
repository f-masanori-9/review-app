"use client";
import { Button } from "@headlessui/react";
import React, { FC } from "react";
import { BsPlus } from "react-icons/bs";
import { Loading } from "../Loading";
export const AddSubNoteButton: FC<{
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
}> = ({ onClick, isLoading }) => {
  return (
    <Button
      className="flex items-center p-1 border-primary border-2 rounded-md h-10 w-40 justify-between"
      // onClick={onClick}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <BsPlus
            className="border-primary bg-white rounded-md border-none"
            color="#06b6d4"
            size={32}
          />
          <div className="flex-grow-0">
            <span className="text-primary text-md font-bold">
              サブノート追加
            </span>
          </div>
        </>
      )}
    </Button>
  );
};
