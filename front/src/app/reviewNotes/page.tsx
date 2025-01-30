"use client";
import { useRouter } from "next/navigation";

import { useNotes } from "@/hooks/useNotes";
import { useAddNote } from "@/hooks/useAddNote";
import { Loading } from "@/components/Loading";
import { FC } from "react";

export default function Page() {
  const router = useRouter();

  const { data: notes = [], isLoading } = useNotes();
  const { addNote } = useAddNote();

  if (isLoading) {
    return <Loading />;
  }

  return notes.map((note) => {
    return <OneNote key={note.id} note={note} />;
  });
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
  return (
    <textarea
      className="w-full h-24 p-2 mr-2 ml-2 border-gray border-[1px] bg-lightPrimary rounded-md"
      defaultValue={note.content}
    />
  );
};
