"use client";

import { useNotes } from "@/hooks/useNotes";
import { Loading } from "@/components/Loading";
import { FC, useState } from "react";
import { useUpdateNoteDebounced } from "@/hooks/useUpdateNoteDebounced";
import { TextAreaWithDynamicRows } from "@/components/TextAreaWithDynamicRows";
import { useAddReview } from "@/hooks/useAddReview";
import { useReward } from "react-rewards";
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
  const { reward, isAnimating } = useReward("rewardId", "confetti");
  const [isFocusing, setIsForcusing] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  return (
    <div className="relative">
      <TextAreaWithDynamicRows
        className={`w-full ${
          isFocusing ? "" : "max-h-[72px]"
        } p-2 border-gray border-[1px] bg-lightPrimary rounded-md{}`}
        defaultValue={note.content}
        onChange={(v) => {
          updateNoteDebounced(note.id, v);
        }}
        onFocus={() => setIsForcusing(true)}
        // onBlur={() => setIsForcusing(false)}
      />
      {isFocusing && (
        <>
          <div className="absolute left-2 bottom-2 z-10">
            <button
              onClick={(e) => {
                reward();
                e.stopPropagation();
                setIsReviewed(true);
                addReview(note.id);
              }}
              disabled={isReviewed}
            >
              <span id="rewardId" />
              復習
            </button>
          </div>
          <div className="absolute right-2 bottom-2">
            <button
              onClick={() => {
                alert("[wip]削除しますか？");
              }}
            >
              削除
            </button>
          </div>
        </>
      )}
    </div>
  );
};
