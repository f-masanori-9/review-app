"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { useNotes } from "@/hooks/useNotes";
import { useAddNote } from "@/hooks/useAddNote";

export default function Page() {
  const router = useRouter();

  const { data: notes = [] } = useNotes();
  const { addNote } = useAddNote();

  return (
    <div className="p-4">
      <AddButton
        onClick={async () => {
          const addedNote = await addNote();
          router.push(`/notes/${addedNote.id}`);
        }}
      />
      <NoteList
        notes={notes}
        onClickItem={(noteId) => {
          router.push(`/notes/${noteId}`);
        }}
      />
    </div>
  );
}

const AddButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button className="bg-cyan-500 text-white rounded-md p-2" onClick={onClick}>
      Add
    </button>
  );
};

type Note = {
  id: string;
  title: string;
  content: string;
};
const NoteList: FC<{
  notes: Note[];
  onClickItem: (noteId: string) => void;
}> = ({ notes, onClickItem }) => {
  return (
    <div className="bg-cyan-500 rounded-md p-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-cyan-300 [&:not(:last-child)]:border-b-2"
          onClick={() => onClickItem(note.id)}
        >
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};
