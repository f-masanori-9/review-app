"use client";

import { Loading } from "@/components/Loading";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ReviewButton } from "@/components/Buttons/ReviewButton";
import { useVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import { OneVocabularyNoteCard } from "./_components/OneVocabularyNoteCard/OneVocabularyNoteCard";

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
