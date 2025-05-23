import { generateApiClient } from "@/libs/apiClient";
import useSWR, { mutate, SWRConfiguration } from "swr";
import { useCallback } from "react";

const client = generateApiClient();

export const generateKey = (noteId: string) => ({
  noteId,
  name: "useOneVocabularyNote",
});

export const useOneVocabularyNote = (
  noteId: string,
  options?: SWRConfiguration
) => {
  return useSWR(
    generateKey(noteId),
    async ({ noteId }) => {
      const response = await client.api["vocabulary-notes"][":id"].$get({
        param: { id: noteId },
      });

      return response.json();
    },
    options
  );
};

export const useMutateOneVocabularyNote = () => {
  const mutateNoteVN = useCallback(async (noteId: string) => {
    await mutate(generateKey(noteId));
  }, []);

  return { mutateNoteVN };
};
