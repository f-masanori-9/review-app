import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";

const client = generateApiClient();

type NoteToTagRelation = {
  readonly id: string;
  readonly userId: string;
  readonly vocabularyNoteId: string;
  readonly tagId: string;
  readonly createdAt: string;
};
export const generateSWRKey = (arg: { noteId: string }) => {
  return {
    path: "useNoteToTagRelations",
    query: {
      noteId: arg.noteId,
    },
  } as const;
};

export const useNoteToTagRelations = ({ noteId }: { noteId: string }) => {
  return useSWR<NoteToTagRelation[]>(generateSWRKey({ noteId }), async () => {
    const response = await client.api["note-to-tag-relations"].$get({
      query: {
        noteId,
      },
    });
    const json = await response.json();
    return json.tagRelations;
  });
};

export const useMutateNoteToTagRelations = () => {
  const mutateNoteToTagRelations = useCallback(
    async ({ noteId }: { noteId: string }) => {
      await mutate<NoteToTagRelation>(generateSWRKey({ noteId }));
    },
    []
  );

  return { mutateNoteToTagRelations };
};
