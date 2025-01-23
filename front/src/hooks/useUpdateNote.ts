import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { EndPointType } from "../../../backend/src/presentator/routeTypes";
import { mutateNotes } from "./useNotes";

const patchNoteApiClient = generateApiClient<EndPointType>();

export const useUpdateNote = () => {
  const updateNote = useCallback(async (noteId: string, content: string) => {
    const response = await patchNoteApiClient.api.note[":noteId"].$patch({
      param: { noteId },
      json: {
        noteId: noteId,
        content,
      },
    });
    mutateNotes();

    const note = await response.json();
    return note;
  }, []);

  return { updateNote };
};
