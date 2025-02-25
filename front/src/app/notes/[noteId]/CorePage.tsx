"use client";

import { useNote } from "@/hooks/useNote";
import { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { useUpdateNoteDebounced } from "@/hooks/useUpdateNoteDebounced";

export const PageCoreContainer: FC<{ noteId: string }> = ({ noteId }) => {
  const { data, isLoading } = useNote(noteId);
  const existingNote = data?.note;

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
  };
}> = ({ note }) => {
  const router = useRouter();

  const { updateNoteDebounced } = useUpdateNoteDebounced();

  const toBack = () => {
    router.push("/notes");
  };

  return (
    <div>
      <IoIosArrowBack onClick={toBack} title="Back" size={24} color="#" />
      <textarea
        className="w-full h-96 p-3 m-1 border-primary"
        defaultValue={note.content || ""}
        onChange={(e) => {
          updateNoteDebounced(note.id, e.target.value);
        }}
      />
    </div>
  );
};
