"use client";

import { useNotes } from "@/hooks/useNotes";
import { Loading } from "@/components/Loading";
import { FC } from "react";
import { useUpdateNoteDebounced } from "@/hooks/useUpdateNoteDebounced";

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

  return (
    <textarea
      className="w-full h-24 p-2  border-gray border-[1px] bg-lightPrimary rounded-md"
      defaultValue={note.content}
      onChange={(e) => {
        updateNoteDebounced(note.id, e.target.value);
      }}
    />
  );
};
