"use client";

import { Loading } from "@/components/Loading";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ReviewButton } from "@/components/Buttons/ReviewButton";
import { useAddVocabularyNoteReview } from "@/hooks/useAddVocabularyNoteReview";
import { useReward } from "react-rewards";
import { useVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const { data: vocabularyNotes = [], isLoading } = useVocabularyNotes();
  const searchParams = useSearchParams();
  const tagIds = searchParams.getAll("tagIds");
  const viewedVocabularyNotes = vocabularyNotes.filter((note) => {
    if (tagIds.length === 0) return true;
    return note.noteToTagRelations.some((relation) =>
      tagIds.includes(relation.tagId)
    );
  });

  const wordCardsAreaRef = React.useRef<HTMLDivElement>(null);

  // スクロールの処理をdebounceでラップ
  const handleScroll = useMemo(
    () =>
      debounce(() => {
        if (wordCardsAreaRef.current) {
        }
      }, 200),
    []
  );

  useEffect(() => {
    const element = wordCardsAreaRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
      handleScroll.cancel(); // debounceのキャンセル
    };
  }, [handleScroll]);

  const scrollToNextCard = useCallback(() => {
    if (wordCardsAreaRef.current) {
      const currentScrollLeft = wordCardsAreaRef.current.scrollLeft;
      const cardWidth = window.innerWidth;
      wordCardsAreaRef.current.scrollTo({
        left: currentScrollLeft + cardWidth,
        behavior: "smooth",
      });
    }
  }, []);
  const [isShowBackContent, setIsShowBackContent] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div
        ref={wordCardsAreaRef}
        className="w-screen overflow-x-scroll h-[calc(100vh-100px)] snap-x snap-mandatory"
      >
        <div
          style={{ width: `${100 * viewedVocabularyNotes.length}vw` }}
          className="flex"
        >
          {viewedVocabularyNotes.map((n, index) => {
            return (
              <OneVocabularyNoteCard
                key={n.id}
                vocabularyNoteId={n.id}
                frontContent={n.frontContent}
                backContent={n.backContent}
                reviewCount={n.reviewLogs.length}
                isShowBackContent={isShowBackContent}
                setIsShowBackContent={setIsShowBackContent}
                allCardsCount={viewedVocabularyNotes.length}
                cardOrder={index + 1}
              />
            );
          })}
        </div>
      </div>
      <div
        className="fixed z-50 bottom-24 left-2  cursor-pointer"
        onClick={scrollToNextCard}
      >
        次へ
      </div>
    </div>
  );
}

const OneVocabularyNoteCard: React.FC<{
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
        <CardHeader
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

const CardHeader: React.FC<{
  onClickReviewButton: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  allCardsCount: number;
  cardOrder: number;
  reviewCount: number;
}> = ({ onClickReviewButton, allCardsCount, cardOrder, reviewCount }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-gray-500">
        <ReviewButton onClick={onClickReviewButton} reviewCount={reviewCount} />
      </div>
      <div className="text-gray-500 text-lg">
        {cardOrder} / {allCardsCount}
      </div>
    </div>
  );
};
