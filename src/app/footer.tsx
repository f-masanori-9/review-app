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
  const onClickToTagManagement = () => {
    router.push("/tags");
  };

  if (status === "unauthenticated") {
    return null;
  }
  return (
    <div className="fixed z-100 bottom-0 w-full p-2 mb-1 bg-white/90 flex justify-between">
      <div className="flex justify-between items-center flex-1">
        <div />
        <div onClick={onClickToVocabularyNotes}>
          <Image
            src="/icon192_maskable.png"
            alt="homeIcon"
            height={40}
            width={40}
          />
          <span className="text-sm">単語帳</span>
        </div>
        <div
          onClick={onClickToTagManagement}
          className="flex flex-col items-center cursor-pointer"
        >
          <div
            style={{
              width: 40,
              height: 40,
              padding: 4,
              paddingInline: 8,
            }}
          ></div>

          <span className="text-sm">タグ管理</span>
        </div>
        <div />
      </div>
    </div>
  );
};
