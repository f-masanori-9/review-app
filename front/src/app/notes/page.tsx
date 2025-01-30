"use client";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

import { useNotes } from "@/hooks/useNotes";
import { useAddNote } from "@/hooks/useAddNote";
import { Loading } from "@/components/Loading";
import { CiSquarePlus } from "react-icons/ci";
export default function Page() {
  const router = useRouter();

  const { data: notes = [], isLoading } = useNotes();
  const { addNote } = useAddNote();

  const [isLoadingNotes, setIsLoadingNote] = useState(false);
  const onClickAddNote = async () => {
    setIsLoadingNote(true);
    try {
      const addedNote = await addNote();
      if (addedNote) {
        router.push(`/notes/${addedNote.id}`);
      }
    } finally {
      setIsLoadingNote(false);
    }
  };

  if (isLoading || isLoadingNotes) {
    return <Loading />;
  }
  return (
    <div className="p-4">
      <NoteList
        notes={notes}
        onClickItem={(noteId) => {
          router.push(`/notes/${noteId}`);
        }}
      />
      <div className="fixed z-50 bottom-10  cursor-pointer">
        <CiSquarePlus
          onClick={onClickAddNote}
          className="border-primary"
          color="#06b6d4"
          size={52}
        />
      </div>
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
    <div className="rounded-md">
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
      className="bg-lightPrimary [&:not(:last-child)]:border-b-2 px-2 py-[2px] cursor-pointer"
      onClick={() => onClickItem(note.id)}
    >
      <p className="truncate font-bold">{title}</p>
      <p className="truncate text-sm">{content}</p>
    </div>
  );
};
