"use client";

import { useNote } from "@/hooks/useNote";
import { useUpdateNote } from "@/hooks/useUpdateNote";
import { FC, useEffect, useMemo } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";

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

  const { updateNote } = useUpdateNote();

  const updateNoteDebounced = useMemo(() => {
    return debounce(updateNote, 1000, {
      maxWait: 2000,
    });
  }, [updateNote]);

  const toBack = () => {
    router.push("/notes");
  };

  useEffect(() => {
    return () => {
      if (updateNoteDebounced.flush) {
        updateNoteDebounced.flush();
      }
      updateNoteDebounced.cancel();
    };
  }, [updateNoteDebounced]);

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
