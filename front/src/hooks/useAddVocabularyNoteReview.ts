import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { EndPointType } from "../../../backend/src/presentator/routeTypes";
import { useVocabularyNotes } from "./useVocabularyNotes";

const internalApi = generateApiClient<EndPointType>();

export const useAddVocabularyNoteReview = () => {
  const { mutate } = useVocabularyNotes();

  const addVocabularyNoteReview = useCallback(
    async (noteId: string) => {
      const response = await internalApi.api["vocabulary-notes"][
        "review-log"
      ].$post({
        json: {
          noteId: noteId,
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
