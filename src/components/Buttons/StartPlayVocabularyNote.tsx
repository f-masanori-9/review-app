import { Button } from "@headlessui/react";
import { FC } from "react";
import { FaPlay } from "react-icons/fa6";
export const StartPlayVocabularyNote: FC<{
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
}> = ({ onClick, isLoading }) => {
  return (
    <Button
      className="flex items-center pr-1 bg-white border-primary border-2 rounded-md justify-between"
      onClick={onClick}
      disabled={isLoading}
    >
      <FaPlay
        className="border-primary  rounded-md border-none mr-1 ml-1"
        color="#06b6d4"
        size={14}
      />
      <div className="flex-grow-0">
        <span className="text-primary text-md font-bold">開始</span>
      </div>
    </Button>
  );
};
