import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { useMutateVocabularyNotes } from "./useVocabularyNotes";

const patchNoteApiClient = generateApiClient();

export const useDeleteVocabularyNote = () => {
  const { mutate } = useMutateVocabularyNotes();
  const deleteVocabularyNote = useCallback(
    async (noteId: string) => {
      const response = await patchNoteApiClient.api["vocabulary-notes"].$delete(
        {
          json: {
            id: noteId,
          },
        }
      );

      mutate();

      const note = await response.json();

      return note;
    },
    [mutate]
  );

  return { deleteVocabularyNote };
};
