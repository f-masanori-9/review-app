import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { PostNotesRoute } from "../../../backend/src/presentator";
import { mutateNotes } from "./useNotes";

const postNoteApiClient = generateApiClient<PostNotesRoute>();

export const useAddNote = () => {
  const addNote = useCallback(async () => {
    const response = await postNoteApiClient.api.notes.$post({
      json: {
        title: "title",
        content: "content",
      },
    });
    mutateNotes();

    const note = await response.json();
    return note;
  }, []);

  return { addNote };
};
