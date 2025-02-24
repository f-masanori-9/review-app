import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { EndPointType } from "../../../backend/src/presentator/routeTypes";
import { mutateNotes } from "./useNotes";

const postNoteApiClient = generateApiClient<EndPointType>();

export const useAddNote = () => {
  const addNote = useCallback(
    async (params?: { parentNoteId?: string; rootNoteId?: string }) => {
      try {
        const response = await postNoteApiClient.api.notes.$post({
          json: {
            title: "",
            content: "",
            ...params,
          },
        });
        mutateNotes();

        const note = await response.json();
        return note;
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

  return { addNote };
};
