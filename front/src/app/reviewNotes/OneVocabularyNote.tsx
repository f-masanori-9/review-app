"use client";

import { useMutateNotes } from "@/hooks/useNotes";
import React, { FC, useCallback, useState } from "react";
import { useUpdateNoteDebounced } from "@/hooks/useUpdateNoteDebounced";
import { useAddReview } from "@/hooks/useAddReview";
import { useReward } from "react-rewards";
import { useDeleteReview } from "@/hooks/useDeleteReview";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { DropDownMenu } from "@/components/DropDownMenu";
import { ReviewButton } from "@/components/Buttons/ReviewButton";
import { differenceInDays } from "date-fns";
import { CiCreditCard2 } from "react-icons/ci";

export const OneVocabularyNote: FC<{
  note: {
    userId: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    content: string;
    answerText: string;
  };
  reviewCount: number;
}> = ({ note, reviewCount }) => {
  const router = useRouter();

  const { updateNoteDebounced } = useUpdateNoteDebounced();
  const { addReview } = useAddReview();
  const { mutate, isLoading: isLoadingMutate } = useMutateNotes();

  const { reward } = useReward("rewardId", "confetti");
  const [isReviewed, setIsReviewed] = useState(false);

  const onClickNote = useCallback(() => {
    router.push(`/reviewNotes/vocabularyNotes/${note.id}`);
  }, [note.id, router]);
  const { deleteReview } = useDeleteReview();

  const opacity = getReviewOpacity(reviewCount);

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex w-200vw  border border-gray-300">
          <div
            className={`${bgColorClass[opacity / 5]} p-2 w-1/2`}
            onClick={onClickNote}
          >
            <div className="flex items-center gap-2">
              <CiCreditCard2 size={24} color="" />
              <span className="text-xs text-gray-500">{`${differenceInDays(
                new Date(),
                note.createdAt
              )}日前`}</span>
              <br />
            </div>
            <span className="whitespace-pre-wrap font-black">
              {note.content}
            </span>
          </div>
          <div
            className={`${bgColorClass[opacity / 5]} p-2 w-1/2`}
            onClick={onClickNote}
          >
            <br />
            <span className="whitespace-pre-wrap font-black">
              {note.answerText}
            </span>
          </div>
        </div>

        <div className="flex justify-between p-2">
          <div
            className="flex items-center gap-2 text-gray-500"
            onClick={onClickNote}
          >
            <ReviewButton
              onClick={async (e) => {
                e.stopPropagation();
                await addReview(note.id);
                setIsReviewed(true);
                reward();
                mutate();
              }}
              reviewCount={reviewCount}
              isReviewed={isReviewed}
              isLoading={isLoadingMutate}
            />
          </div>
          <DropDownMenu
            menuButtonChildren={<BsThreeDotsVertical />}
            items={[
              {
                key: "delete",
                children: (
                  <div className="flex items-center gap-1">
                    <FaTrash />
                    <span>削除</span>
                  </div>
                ),
                onClick: () => {
                  if (confirm("削除しますか？")) {
                    deleteReview(note.id);
                  }
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const getReviewOpacity = (count: number): number => {
  const maxReviews = 30;
  const maxOpacity = 100;
  return Math.min(
    Math.floor(((count / maxReviews) * maxOpacity) / 5) * 5,
    maxOpacity
  );
};

const bgColorClass = [
  `bg-blue-300/0`,
  `bg-blue-300/5`,
  `bg-blue-300/10`,
  `bg-blue-300/15`,
  `bg-blue-300/20`,
  `bg-blue-300/25`,
  `bg-blue-300/30`,
  `bg-blue-300/35`,
  `bg-blue-300/40`,
  `bg-blue-300/45`,
  `bg-blue-300/50`,
  `bg-blue-300/55`,
  `bg-blue-300/60`,
  `bg-blue-300/65`,
  `bg-blue-300/70`,
  `bg-blue-300/75`,
  `bg-blue-300/80`,
  `bg-blue-300/85`,
  `bg-blue-300/90`,
  `bg-blue-300/95`,
  `bg-blue-300/100`,
] as const;
