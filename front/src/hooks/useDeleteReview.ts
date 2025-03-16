import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { mutateNotes } from "./useNotes";

const internalApi = generateApiClient();

export const useDeleteReview = () => {
  const deleteReview = useCallback(async (noteId: string) => {
    const response = await internalApi.api.note.$delete({
      json: {
        noteId: noteId,
      },
    });

    mutateNotes();
    const res = await response.json();

    return res;
  }, []);

  return { deleteReview };
};
