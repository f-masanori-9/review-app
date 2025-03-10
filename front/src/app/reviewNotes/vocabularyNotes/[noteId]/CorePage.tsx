"use client";

import { useMutateNote, useNote } from "@/hooks/useNote";
import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { useAddNote } from "@/hooks/useAddNote";
import React from "react";
import { useAddReview } from "@/hooks/useAddReview";
import { useVocabularyNote } from "@/hooks/useVocabularyNote";
import { useUpdateVocabularyNoteDebounced } from "@/hooks/useUpdateVocabularyNoteDebounced";

export const PageCoreContainer: FC<{ noteId: string }> = ({ noteId }) => {
  const { data: existingNote, isLoading } = useVocabularyNote(noteId);

  if (isLoading) {
    return <Loading />;
  }
  if (!existingNote) {
    return <div>Not Found</div>;
  }
  return <PageCore note={existingNote} />;
};

const PageCore: FC<{
  note: {
    id: string;
    content: string;
    answerText: string;
  };
}> = ({ note }) => {
  const router = useRouter();
  const { mutateNote } = useMutateNote();
  const { updateVocabularyNoteDebounced } = useUpdateVocabularyNoteDebounced();
  const { addNote, isLoading } = useAddNote();
  const [isReviewed, setIsReviewed] = useState(false);
  const { addReview } = useAddReview();
  const { mutate } = useNote(note.id);

  const toBack = () => {
    router.push("/reviewNotes");
  };
  useEffect(() => {
    return () => {
      updateVocabularyNoteDebounced.flush();
    };
  }, [updateVocabularyNoteDebounced]);

  return (
    <div className="p-1 w-full overflow-x-hidden">
      <IoIosArrowBack onClick={toBack} title="Back" size={24} color="#" />
      <TextAreaAutoSize
        defaultValue={note.content || ""}
        onChange={(e) => {
          updateVocabularyNoteDebounced(
            note.id,
            e.target.value,
            note.answerText
          );
        }}
      />
      {/* <div className="flex justify-between p-2">
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
      </div> */}

      {/* divider */}
      <div className="border-b border-gray-300"></div>
      <TextAreaAutoSize
        defaultValue={note.answerText || ""}
        onChange={(e) => {
          updateVocabularyNoteDebounced(note.id, note.content, e.target.value);
        }}
      />
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
