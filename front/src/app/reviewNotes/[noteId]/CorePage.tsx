"use client";

import { useNote } from "@/hooks/useNote";
import { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { useUpdateNoteDebounced } from "@/hooks/useUpdateNoteDebounced";

export const PageCoreContainer: FC<{ noteId: string }> = ({ noteId }) => {
  const { data, isLoading } = useNote(noteId);
  const existingNote = data;

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
    router.push("/reviewNotes");
  };

  return (
    <div className="p-1 w-full overflow-x-hidden v">
      <IoIosArrowBack onClick={toBack} title="Back" size={24} color="#" />
      <textarea
        className="w-full h-[1000px] p-3 m-1 border-none focus:ring-0 focus:outline-none"
        defaultValue={note.content || ""}
        onChange={(e) => {
          updateNoteDebounced(note.id, e.target.value);
        }}
        placeholder="メモを入力しましょう"
      />
    </div>
  );
};
