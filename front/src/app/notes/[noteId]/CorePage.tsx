"use client";

import { useNote } from "@/hooks/useNote";
import { useUpdateNote } from "@/hooks/useUpdateNote";
import { FC, useMemo } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

export const PageCoreContainer: FC<{ noteId: string }> = ({ noteId }) => {
  const { data, isLoading } = useNote(noteId);
  const existingNote = data;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!existingNote) {
    return <div>Not Found</div>;
  }
  return <PageCore note={existingNote} />;
};

const PageCore: FC<{
  note: {
    id: string;
    title: string;
    content: string;
  };
}> = ({ note }) => {
  const router = useRouter();

  const { updateNote } = useUpdateNote();

  const updateNoteDebounced = useMemo(() => {
    return debounce(updateNote, 1000);
  }, [updateNote]);

  const toBack = () => {
    router.push("/notes");
  };

  return (
    <div>
      <IoIosArrowBack onClick={toBack} title="Back" size={24} color="#" />
      <textarea
        className="w-full h-96 p-3"
        defaultValue={note.content || ""}
        onChange={(e) => {
          updateNoteDebounced(note.id, e.target.value);
        }}
      />
    </div>
  );
};
