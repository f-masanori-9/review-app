import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { useMutateNote } from "./useNote";

const internalApi = generateApiClient();

export const useAddReview = () => {
  const { mutateNote } = useMutateNote();

  const addReview = useCallback(
    async (noteId: string) => {
      const response = await internalApi.api["review-logs"].$post({
        json: {
          noteId: noteId,
        },
      });
      // mutateNote(noteId);
      // mutateNotes();

      const note = await response.json();

      return note;
    },
    [mutateNote]
  );

  return { addReview };
};
