"use client";

import { Loading } from "@/components/Loading";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ReviewButton } from "@/components/Buttons/ReviewButton";
import { useAddVocabularyNoteReview } from "@/hooks/useAddVocabularyNoteReview";
import { useReward } from "react-rewards";
import { useVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { debounce } from "lodash";

export default function Page() {
  const { data: vocabularyNotes = [], isLoading } = useVocabularyNotes();
  const router = useRouter();

  const wordCardsAreaRef = React.useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(1);
  const [scrollLeft, setScrollLeft] = useState(1);

  console.log("scrollWidth", scrollWidth);
  console.log("scrollLeft", scrollLeft);
  // スクロールの処理をdebounceでラップ
  const handleScroll = useMemo(
    () =>
      debounce(() => {
        if (wordCardsAreaRef.current) {
          setScrollWidth(wordCardsAreaRef.current.scrollWidth);
          setScrollLeft(wordCardsAreaRef.current.scrollLeft);
        }
      }, 200),
    []
  );

  useEffect(() => {
    const element = wordCardsAreaRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    // クリーンアップ
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

  // 何枚目のカードを表示しているかを計算
  const currentCardIndex =
    Math.trunc((scrollLeft / scrollWidth) * vocabularyNotes.length) + 1;
  console.log("currentCardIndex", currentCardIndex);

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
          style={{ width: `${100 * vocabularyNotes.length}vw` }}
          className="flex"
        >
          {vocabularyNotes.map((n) => {
            return (
              <OneVocabularyNoteCard
                key={n.id}
                vocabularyNoteId={n.id}
                frontContent={n.frontContent}
                backContent={n.backContent}
                reviewCount={n.reviewLogs.length}
                isShowBackContent={isShowBackContent}
                setIsShowBackContent={setIsShowBackContent}
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
      {/* 戻る */}
      <div
        className="fixed z-50 bottom-24 right-2  cursor-pointer"
        onClick={() => {
          router.push(`/vocabularyNotes`);
        }}
      >
        戻る
      </div>
      {/* 何枚目のカードまで進んだのかを表示 */}
      <div className="fixed z-50 bottom-14 left-2 text-gray-500">
        {currentCardIndex} / {vocabularyNotes.length}
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
}> = ({ vocabularyNoteId, frontContent, backContent, reviewCount }) => {
  const { addVocabularyNoteReview } = useAddVocabularyNoteReview();
  const { reward } = useReward("rewardId", "confetti");
  const [isShowBackContent, setIsShowBackContent] = useState(false);

  return (
    <div
      key={vocabularyNoteId}
      className="w-screen snap-center h-[calc(100vh-110px)]  p-1"
    >
      <div className="">{frontContent}</div>
      <div className="border-b border-gray-300" />
      <div className="flex justify-between p-2">
        <div
          className="flex items-center gap-2 text-gray-500"
          // onClick={onClickNote}
        >
          <ReviewButton
            onClick={async (e) => {
              e.stopPropagation();
              await addVocabularyNoteReview(vocabularyNoteId);
              // setIsReviewed(true);
              reward();
              // mutate();
            }}
            reviewCount={reviewCount}
            //   isReviewed={isReviewed}
            //   isLoading={isLoadingMutate}
          />
        </div>
      </div>
      {isShowBackContent ? (
        <div className="">{backContent}</div>
      ) : (
        <div
          className="text-gray-500 text-sm cursor-pointer"
          onClick={() => setIsShowBackContent(true)}
        >
          回答を見る
        </div>
      )}
    </div>
  );
};
