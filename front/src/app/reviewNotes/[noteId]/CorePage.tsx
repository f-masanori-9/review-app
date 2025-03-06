"use client";

import { useMutateNote, useNote } from "@/hooks/useNote";
import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { useUpdateNoteDebounced } from "@/hooks/useUpdateNoteDebounced";
import { AddSubNoteButton } from "@/components/Buttons/AddSubNote";
import { useAddNote } from "@/hooks/useAddNote";
import React from "react";
import { ReviewButton } from "@/components/Buttons/ReviewButton";
import { useAddReview } from "@/hooks/useAddReview";

export const PageCoreContainer: FC<{ noteId: string }> = ({ noteId }) => {
  const { data, isLoading } = useNote(noteId);
  const existingNote = data?.note;
  const subNotes = data?.subNotes || [];

  if (isLoading) {
    return <Loading />;
  }
  if (!existingNote) {
    return <div>Not Found</div>;
  }
  return <PageCore note={existingNote} subNotes={subNotes} />;
};

const PageCore: FC<{
  note: {
    id: string;
    content: string;
    reviewCount: number;
  };
  subNotes: {
    id: string;
    content: string;
    reviewCount: number;
  }[];
}> = ({ note, subNotes }) => {
  const router = useRouter();
  const { mutateNote } = useMutateNote();
  const { updateNoteDebounced } = useUpdateNoteDebounced();
  const { addNote } = useAddNote();
  const [isReviewed, setIsReviewed] = useState(false);
  const { addReview } = useAddReview();
  const { mutate } = useNote(note.id);

  const toBack = () => {
    router.push("/reviewNotes");
  };
  useEffect(() => {
    return () => {
      updateNoteDebounced.flush();
    };
  }, [updateNoteDebounced]);

  return (
    <div className="p-1 w-full overflow-x-hidden">
      <IoIosArrowBack onClick={toBack} title="Back" size={24} color="#" />
      <TextAreaAutoSize
        defaultValue={note.content || ""}
        onChange={(e) => {
          updateNoteDebounced(note.id, e.target.value);
        }}
      />
      <div className="flex justify-between p-2">
        <ReviewButton
          onClick={async (e) => {
            e.stopPropagation();
            await addReview(note.id);
            setIsReviewed(true);
            mutate();
          }}
          reviewCount={note.reviewCount}
          isReviewed={isReviewed}
          // isLoading={isLoadingMutate}
        />
      </div>

      {/* divider */}
      <div className="border-b border-gray-300"></div>
      <span className="text-sm text-gray-500">{` サブノート ${subNotes.length}`}</span>
      <div className="border-b border-gray-300"></div>

      {subNotes.map((subNote) => {
        return (
          <>
            <TextAreaAutoSize
              key={subNote.id}
              defaultValue={subNote.content || ""}
              onChange={(e) => {
                updateNoteDebounced(subNote.id, e.target.value);
              }}
            />
            <div className="flex justify-between p-2">
              <ReviewButton
                onClick={async (e) => {
                  e.stopPropagation();
                  await addReview(note.id);
                  setIsReviewed(true);
                  mutate();
                }}
                reviewCount={subNote.reviewCount}
                isReviewed={isReviewed}
                // isLoading={isLoadingMutate}
              />
            </div>
          </>
        );
      })}
      <div className="flex justify-center">
        <AddSubNoteButton
          onClick={async () => {
            await addNote({ rootNoteId: note.id });
            mutateNote(note.id);
          }}
        />
      </div>
    </div>
  );
};

const TextAreaAutoSize: FC<{
  defaultValue: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}> = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  const ref = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <textarea
      ref={ref}
      className="w-full h-auto p-3 m-1 border-none focus:ring-0 focus:outline-none"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e);
      }}
      placeholder="メモを入力しましょう"
    />
  );
};
