import { generateApiClient } from "@/libs/apiClient";
import useSWR, { mutate } from "swr";
import { useCallback } from "react";

const client = generateApiClient();

export const generateKey = (noteId: string) => ({
  noteId,
  name: "useVocabularyNote",
});

export const useVocabularyNote = (noteId: string) => {
  return useSWR(generateKey(noteId), async ({ noteId }) => {
    const response = await client.api["vocabulary-notes"].$get({
      param: { noteId },
    });

    return response.json();
  });
};

export const useMutateVocabularyNote = () => {
  const mutateNoteVN = useCallback(async (noteId: string) => {
    await mutate(generateKey(noteId));
  }, []);

  return { mutateNoteVN };
};
