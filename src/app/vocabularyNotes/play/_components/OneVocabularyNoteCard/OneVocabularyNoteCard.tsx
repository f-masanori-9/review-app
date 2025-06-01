"use client";

import React, { useState } from "react";

import { useAddVocabularyNoteReview } from "@/hooks/useAddVocabularyNoteReview";
import { useReward } from "react-rewards";
import { Header } from "./header/Header";

export const OneVocabularyNoteCard: React.FC<{
  vocabularyNoteId: string;
  frontContent: string;
  backContent: string;
  reviewCount: number;
  isShowBackContent: boolean;
  setIsShowBackContent: React.Dispatch<React.SetStateAction<boolean>>;
  allCardsCount: number;
  cardOrder: number;
}> = ({
  vocabularyNoteId,
  frontContent,
  backContent,
  reviewCount,
  allCardsCount,
  cardOrder,
}) => {
  const { addVocabularyNoteReview } = useAddVocabularyNoteReview();
  const { reward } = useReward("rewardId", "confetti");
  const [isShowBackContent, setIsShowBackContent] = useState(false);

  return (
    <div
      key={vocabularyNoteId}
      className="w-screen snap-center h-[calc(100vh-110px)] p-4 flex items-center justify-center relative"
    >
      <div className="flex flex-col gap-2 w-full max-w-md bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        <Header
          onClickReviewButton={async (e) => {
            e.stopPropagation();
            await addVocabularyNoteReview(vocabularyNoteId);
            reward();
          }}
          allCardsCount={allCardsCount}
          cardOrder={cardOrder}
          reviewCount={reviewCount}
        />
        <div className="text-lg font-semibold text-center whitespace-pre-wrap break-words">
          {frontContent}
        </div>
        <div className="border-b border-gray-300" />

        {isShowBackContent ? (
          <div className=" flex flex-col items-center gap-3">
            <div className="text-gray-700 whitespace-pre-wrap break-words">
              {backContent}
            </div>
            <button
              onClick={() => setIsShowBackContent(false)}
              type="button"
              className="text-gray-600 hover:text-white border-gray-400 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              回答を隠す
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsShowBackContent(true)}
            type="button"
            className="text-gray-600 hover:text-white border-gray-400 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 w-full"
          >
            回答を見る
          </button>
        )}
      </div>
    </div>
  );
};
