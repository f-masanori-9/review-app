"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { CgNotes } from "react-icons/cg";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

export const Footer: FC = () => {
  const router = useRouter();

  const onClickToReviewNotes = () => {
    router.push("/reviewNotes");
  };
  const onClickToAccount = () => {
    router.push("/account");
  };
  const onClickToSettings = () => {
    router.push("/notes");
  };

  return (
    <div className="fixed z-100 bottom-0 w-full p-2 mb-1 bg-white/90 flex justify-between">
      <div
        className="flex justify-center items-center flex-1"
        onClick={onClickToReviewNotes}
      >
        <CgNotes color="black" size={30} />
      </div>
      <div
        className="flex justify-center items-center flex-1"
        onClick={onClickToAccount}
      >
        <MdOutlineAccountCircle color="black" size={30} />
      </div>
      <div
        className="flex justify-center items-center flex-1"
        onClick={onClickToSettings}
      >
        <IoSettingsOutline color="black" size={30} />
      </div>
    </div>
  );
};
