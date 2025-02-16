"use client";

import { useMutateNotes, useNotes } from "@/hooks/useNotes";
import { Loading } from "@/components/Loading";
import React, { FC, useCallback, useState } from "react";
import { useUpdateNoteDebounced } from "@/hooks/useUpdateNoteDebounced";
import { useAddReview } from "@/hooks/useAddReview";
import { useReward } from "react-rewards";
import { useDeleteReview } from "@/hooks/useDeleteReview";
import { CiSquareCheck } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import ClickAwayListener from "react-click-away-listener";
import { FaTrash } from "react-icons/fa";
export default function Page() {
  const { data: notesWithReviewLogs = [], isLoading } = useNotes();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-1">
      {notesWithReviewLogs.map(({ reviewLogs, ...note }) => {
        const reviewCount = reviewLogs.length;
        return <OneNote key={note.id} note={note} reviewCount={reviewCount} />;
      })}
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
  const [isFocusing, setIsForcusing] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);

  const onClickNote = useCallback(() => {
    router.push(`/reviewNotes/${note.id}`);
  }, [note.id, router]);
  const { deleteReview } = useDeleteReview();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div>
      <div className="whitespace-pre-wrap" onClick={onClickNote}>
        {note.content}
      </div>
      <div className="flex justify-between p-2">
        <button
          id="rewardId"
          onClick={(e) => {
            e.stopPropagation();
            addReview(note.id);
            setIsReviewed(true);
            reward();
            mutate();
          }}
          className="flex items-center gap-1"
          disabled={isLoadingMutate}
        >
          {isLoadingMutate ? (
            <Loading />
          ) : (
            <>
              <CiSquareCheck />
              <span>{reviewCount}</span>
            </>
          )}
        </button>

        <DropDownMenu
          menuButton={
            <button>
              <BsThreeDotsVertical />
            </button>
          }
          isOpen={isOpenMenu}
          onCloseMenu={() => setIsOpenMenu(false)}
          onOpenMenu={() => !isOpenMenu && setIsOpenMenu(true)}
          items={[
            <div
              key="delete"
              className="flex items-center gap-1"
              onClick={() => {
                if (confirm("削除しますか？")) {
                  deleteReview(note.id);
                }
              }}
            >
              <FaTrash />
              <span>削除</span>
            </div>,
          ]}
        />
      </div>
    </div>
  );
};

const DropDownMenu: FC<{
  isOpen: boolean;
  menuButton: React.ReactNode;
  items: React.ReactNode[];
  onCloseMenu: () => void;
  onOpenMenu: () => void;
}> = ({ menuButton, onCloseMenu, onOpenMenu, isOpen, items }) => {
  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => {
          onOpenMenu();
        }}
      >
        {menuButton}
      </div>
      {isOpen && (
        <ClickAwayListener onClickAway={onCloseMenu}>
          <div
            className="absolute right-0 z-10 mt-2 w-56 p-1 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            {items}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};
