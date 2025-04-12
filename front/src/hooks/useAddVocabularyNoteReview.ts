import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { useVocabularyNotes } from "./vocabularyNote/useVocabularyNotes";

const internalApi = generateApiClient();

export const useAddVocabularyNoteReview = () => {
  const { mutate } = useVocabularyNotes();

  const addVocabularyNoteReview = useCallback(
    async (noteId: string) => {
      const response = await internalApi.api["vocabulary-notes"][
        "review-logs"
      ].$post({
        json: {
          vocabularyNoteId: noteId,
        },
      });
      mutate();

      const note = await response.json();

      return note;
    },
    [mutate]
  );

  return { addVocabularyNoteReview };
};
