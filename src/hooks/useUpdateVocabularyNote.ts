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
    async (
      args: { noteId: string } & (
        | {
            kind: "frontContent";
            content: string;
          }
        | {
            kind: "backContent";
            content: string;
          }
      )
    ) => {
      const body = (() => {
        switch (args.kind) {
          case "frontContent":
            return {
              id: args.noteId,
              kind: "frontContent",
              frontContent: args.content,
            } as const;
          case "backContent":
            return {
              id: args.noteId,
              kind: "backContent",
              backContent: args.content,
            } as const;
        }
      })();
      const response = await client.api["vocabulary-notes"][":id"].$patch({
        param: { id: args.noteId },
        json: body,
      });
      await mutateNoteVN(body.id);
      await mutateVocabularyNotes();
      await mutateOneNoteVN(body.id);

      const note = await response.json();

      return note;
    },
    [mutateNoteVN, mutateOneNoteVN, mutateVocabularyNotes]
  );

  return { updateNote };
};
