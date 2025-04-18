import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { useMutateVocabularyNote } from "./useVocabularyNote";
import { useMutateVocabularyNotes } from "./vocabularyNote/useVocabularyNotes";
import { useMutateOneVocabularyNote } from "./vocabularyNote/useOneVocabularyNote";

const client = generateApiClient();

export const useUpdateVocabularyNote = () => {
  const { mutateNoteVN } = useMutateVocabularyNote();
  const { mutate: mutateVocabularyNotes } = useMutateVocabularyNotes();
  const { mutateNoteVN: mutateOneNoteVN } = useMutateOneVocabularyNote();
  const updateNote = useCallback(
    async (noteId: string, content: string, answerText: string) => {
      const response = await client.api["vocabulary-notes"][":id"].$patch({
        param: { id: noteId },
        json: {
          id: noteId,
          frontContent: content, // TODO:命名
          backContent: answerText || "", // TODO:命名
        },
      });
      await mutateNoteVN(noteId);
      await mutateVocabularyNotes();
      await mutateOneNoteVN(noteId);

      const note = await response.json();

      return note;
    },
    [mutateNoteVN, mutateOneNoteVN, mutateVocabularyNotes]
  );

  return { updateNote };
};
