"use client";

import { useNotes } from "@/hooks/useNotes";
import { Loading } from "@/components/Loading";
import { FC, useState } from "react";
import { useUpdateNoteDebounced } from "@/hooks/useUpdateNoteDebounced";
import { TextAreaWithDynamicRows } from "@/components/TextAreaWithDynamicRows";
import { useAddReview } from "@/hooks/useAddReview";
import { useReward } from "react-rewards";
import { MdOutlinePreview } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useDeleteReview } from "@/hooks/useDeleteReview";
export default function Page() {
  const { data: notes = [], isLoading } = useNotes();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-1">
      {notes.map((note) => {
        return <OneNote key={note.id} note={note} />;
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
}> = ({ note }) => {
  const { updateNoteDebounced } = useUpdateNoteDebounced();
  const { addReview } = useAddReview();
  const { deleteReview } = useDeleteReview();
  const { reward, isAnimating } = useReward("rewardId", "confetti");
  const [isFocusing, setIsForcusing] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  return (
    <div className="relative z-0">
      <TextAreaWithDynamicRows
        className={`w-full ${
          isFocusing ? "" : "max-h-[72px]"
        } p-2 border-gray border-[1px] bg-lightPrimary rounded-md z-0`}
        defaultValue={note.content}
        onChange={(v) => {
          updateNoteDebounced(note.id, v);
        }}
        onFocus={() => setIsForcusing(true)}
      />
      {isFocusing && (
        <>
          <div className="absolute left-2 bottom-2 ">
            <span id="rewardId" />
            {!isReviewed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addReview(note.id);
                  setIsReviewed(true);
                  reward();
                }}
                className="flex items-center"
              >
                <MdOutlinePreview size={24} color={"#0F1A45"} />
                復習
              </button>
            )}
          </div>
          <div className="absolute right-2 bottom-2">
            <FaTrash
              onClick={() => {
                if (confirm("[wip]削除しますか？")) {
                  deleteReview(note.id);
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
