import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";

const client = generateApiClient();

export const generateSWRKey = (arg: { noteId: string }) => {
  return {
    path: "useNoteToTagRelations",
    query: {
      noteId: arg.noteId,
    },
  } as const;
};

export const useNoteToTagRelations = ({ noteId }: { noteId: string }) => {
  return useSWR(generateSWRKey({ noteId }), async () => {
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
  const mutateTags = useCallback(async ({ noteId }: { noteId: string }) => {
    await mutate(generateSWRKey({ noteId }));
  }, []);

  return { mutateTags };
};
