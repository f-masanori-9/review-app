import { generateApiClient } from "@/libs/apiClient";
import { useCallback, useState } from "react";
import { useMutateVocabularyNotes } from "./vocabularyNote/useVocabularyNotes";

const postNoteApiClient = generateApiClient();

export const useAddVocabularyNote = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: mutateVocabularyNotes } = useMutateVocabularyNotes();
  const addVocabularyNote = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await postNoteApiClient.api["vocabulary-notes"].$post({
        json: {
          id: crypto.randomUUID(),
          frontContent: "未入力",
          backContent: "🥚",
        },
      });
      await mutateVocabularyNotes();

      const { vocabularyNote } = await response.json();
      return vocabularyNote;
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [mutateVocabularyNotes]);

  return { addVocabularyNote, isLoading };
};
