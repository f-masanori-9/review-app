import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { PostNotesRoute } from "../../../backend/src/presentator/routeTypes";
import { mutateNotes } from "./useNotes";

const postNoteApiClient = generateApiClient<PostNotesRoute>();

export const useAddNote = () => {
  const addNote = useCallback(async () => {
    try {
      const response = await postNoteApiClient.api.notes.$post({
        json: {
          title: "title",
          content: "content",
        },
      });
      mutateNotes();

      const note = await response.json();
      return note;
    } catch (e) {
      console.error(e);
    }
  }, []);

  return { addNote };
};
