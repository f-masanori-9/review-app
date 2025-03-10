import { generateApiClient } from "@/libs/apiClient";
import useSWR, { mutate } from "swr";
import { EndPointType } from "../../../backend/src/presentator/routeTypes";
import { useCallback } from "react";

const client = generateApiClient<EndPointType>();

export const generateKey = (noteId: string) => ({
  noteId,
  name: "useVocabularyNote",
});

export const useVocabularyNote = (noteId: string) => {
  return useSWR(generateKey(noteId), async ({ noteId }) => {
    const response = await client.api["vocabulary-notes"][":noteId"].$get({
      param: { noteId },
    });

    return response.json();
  });
};

export const useMutateVocabularyNote = () => {
  const mutateNote = useCallback(async (noteId: string) => {
    await mutate(generateKey(noteId));
  }, []);

  return { mutateNote };
};
