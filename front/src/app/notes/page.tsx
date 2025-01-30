"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { useNotes } from "@/hooks/useNotes";
import { useAddNote } from "@/hooks/useAddNote";
import { Loading } from "@/components/Loading";

export default function Page() {
  const router = useRouter();

  const { data: notes = [], isLoading } = useNotes();
  const { addNote } = useAddNote();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="">
      <AddButton
        onClick={async () => {
          const addedNote = await addNote();
          if (addedNote) {
            router.push(`/notes/${addedNote.id}`);
          }
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
    <button className="bg-primary text-white rounded-md p-2" onClick={onClick}>
      Add
    </button>
  );
};

type Note = {
  id: string;
  content: string;
};

const NoteList: FC<{
  notes: Note[];
  onClickItem: (noteId: string) => void;
}> = ({ notes, onClickItem }) => {
  return (
    <div className="rounded-md m-4">
      {notes.map((note) => (
        <OneNote key={note.id} note={note} onClickItem={onClickItem} />
      ))}
    </div>
  );
};

const OneNote: FC<{ note: Note; onClickItem: (noteId: string) => void }> = ({
  note,
  onClickItem,
}) => {
  const title = note.content.split("\n")[0];
  const content = note.content.split("\n").slice(1).join("\n") || "\n　";
  return (
    <div
      key={note.id}
      className="bg-cyan-300 [&:not(:last-child)]:border-b-2"
      onClick={() => onClickItem(note.id)}
    >
      <p className="truncate font-bold">{title}</p>
      <p className="truncate text-sm">{content}</p>
    </div>
  );
};
