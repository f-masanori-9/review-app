"use client";

import { useMutateNotes, useNotes } from "@/hooks/useNotes";
import { Loading } from "@/components/Loading";
import React, { FC, useCallback, useState } from "react";
import { useUpdateNoteDebounced } from "@/hooks/useUpdateNoteDebounced";
import { useAddReview } from "@/hooks/useAddReview";
import { useReward } from "react-rewards";
import { useDeleteReview } from "@/hooks/useDeleteReview";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { DropDownMenu } from "@/components/DropDownMenu";
import { AddNoteButton } from "@/components/Buttons/AddNote";
import { ReviewButton } from "@/components/Buttons/ReviewButton";
import { useAddNote } from "@/hooks/useAddNote";
import { differenceInDays } from "date-fns";
export default function Page() {
  const { data: notesWithReviewLogs = [], isLoading } = useNotes();
  const router = useRouter();
  const { addNote } = useAddNote();
  const [isLoadingNotes, setIsLoadingNote] = useState(false);
  const onClickAddNote = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsLoadingNote(true);
    try {
      const addedNote = await addNote();
      if (addedNote) {
        router.push(`/reviewNotes/${addedNote.id}`);
      }
    } finally {
      setIsLoadingNote(false);
    }
  };
  if (isLoading || isLoadingNotes) {
    return <Loading />;
  }

  return (
    <div className="p-1 mb-28">
      {notesWithReviewLogs.map(({ reviewLogs, ...note }) => {
        const reviewCount = reviewLogs.length;
        return (
          <div className="border-b border-gray-300" key={note.id}>
            <OneNote key={note.id} note={note} reviewCount={reviewCount} />
          </div>
        );
      })}
      <div className="fixed z-50 bottom-14 left-2  cursor-pointer">
        <AddNoteButton onClick={onClickAddNote} />
      </div>
    </div>
  );
}

const OneNote: FC<{
  note: {
    userId: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    content: string;
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
    router.push(`/reviewNotes/${note.id}`);
  }, [note.id, router]);
  const { deleteReview } = useDeleteReview();

  const opacity = getReviewOpacity(reviewCount);

  return (
    <div className="w-full overflow-x-hidden">
      <div className={`${bgColorClass[opacity / 5]} p-2`} onClick={onClickNote}>
        <span className="text-xs text-gray-500">{`${differenceInDays(
          new Date(),
          note.createdAt
        )}日前`}</span>
        <br />
        <span className="whitespace-pre-wrap font-black">{note.content}</span>
      </div>
      <div className="flex justify-between p-2">
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
