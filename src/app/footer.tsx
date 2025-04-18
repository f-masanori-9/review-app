"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Image from "next/image";

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
      <div
        className="flex justify-center items-center flex-1"
        onClick={onClickToVocabularyNotes}
      >
        <div>
          <Image
            src="/icon192_maskable.png"
            alt="homeIcon"
            height={40}
            width={40}
          />
          <span className="text-sm">単語帳</span>
        </div>
      </div>
    </div>
  );
};
