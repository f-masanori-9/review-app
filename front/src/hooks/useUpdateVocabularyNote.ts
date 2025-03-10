import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { EndPointType } from "../../../backend/src/presentator/routeTypes";
import { mutateNotes } from "./useNotes";
import { useMutateVocabularyNote } from "./useVocabularyNote";

const patchNoteApiClient = generateApiClient<EndPointType>();

export const useUpdateVocabularyNote = () => {
  const { mutateNote } = useMutateVocabularyNote();
  const updateNote = useCallback(
    async (noteId: string, content: string, answerText: string) => {
      const response = await patchNoteApiClient.api["vocabulary-notes"][
        ":noteId"
      ].$patch({
        param: { noteId },
        json: {
          noteId: noteId,
          content,
          answerText,
        },
      });
      mutateNote(noteId);
      mutateNotes();

      const note = await response.json();

      return note;
    },
    [mutateNote]
  );

  return { updateNote };
};
