import { generateApiClient } from "@/libs/apiClient";
import { useCallback, useState } from "react";
import { EndPointType } from "../../../backend/src/presentator/routeTypes";
import { mutateNotes } from "./useNotes";

const postNoteApiClient = generateApiClient<EndPointType>();

export const useAddNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addNote = useCallback(
    async (params?: { parentNoteId?: string; rootNoteId?: string }) => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { addNote, isLoading };
};
