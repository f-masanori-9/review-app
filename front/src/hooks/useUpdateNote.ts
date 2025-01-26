import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { EndPointType } from "../../../backend/src/presentator/routeTypes";
import { mutateNotes } from "./useNotes";
import { useMutateNote } from "./useNote";

const patchNoteApiClient = generateApiClient<EndPointType>();

export const useUpdateNote = () => {
  const { mutateNote } = useMutateNote();
  const updateNote = useCallback(async (noteId: string, content: string) => {
    const response = await patchNoteApiClient.api.note[":noteId"].$patch({
      param: { noteId },
      json: {
        noteId: noteId,
        content,
      },
    });
    mutateNote(noteId);
    mutateNotes();

    const note = await response.json();

    return note;
  }, []);

  return { updateNote };
};
