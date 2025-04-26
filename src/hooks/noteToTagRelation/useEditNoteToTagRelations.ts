import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";

const client = generateApiClient();

export const generateSWRKey = (arg: { noteId: string }) => {
  return {
    path: "useNoteToTagRelations",
    query: {
      noteId: arg.noteId,
    },
  } as const;
};

export const editNoteToTagRelations = async ({
  noteId,
  tagIds,
}: {
  noteId: string;
  tagIds: string[];
}) => {
  const response = await client.api["note-to-tag-relations"].$post({
    json: {
      noteId: noteId,
      tagIds: tagIds,
    },
  });
  const json = await response.json();
  return json;
};

export const useEditNoteToTagRelations = () => {
  const editNoteToTagRelations_ = useCallback(editNoteToTagRelations, []);

  return { editNoteToTagRelations: editNoteToTagRelations_ };
};
