"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const Footer: FC = () => {
  const router = useRouter();
  const { status } = useSession();

  const onClickToVocabularyNotes = () => {
    router.push("/vocabularyNotes");
  };

  if (status === "unauthenticated") {
    return null;
  }
  return (
    <div className="fixed z-100 bottom-0 w-full p-2 mb-1 bg-white/90 flex justify-between">
      {/* <div
        className="flex justify-center items-center flex-1"
        onClick={onClickToReviewNotes}
      >
        <CgNotes color="black" size={30} />
      </div> */}

      <div
        className="flex justify-center items-center flex-1"
        onClick={onClickToVocabularyNotes}
      >
        words
      </div>
    </div>
  );
};
