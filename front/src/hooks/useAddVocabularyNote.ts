import { generateApiClient } from "@/libs/apiClient";
import { useCallback, useState } from "react";
import { EndPointType } from "../../../backend/src/presentator/routeTypes";
import { mutateNotes } from "./useNotes";

const postNoteApiClient = generateApiClient<EndPointType>();

export const useAddVocabularyNote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addVocabularyNote = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await postNoteApiClient.api["vocabulary-notes"].$post({
        json: {
          title: "",
          content: "",
          answerText: "",
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
  }, []);

  return { addVocabularyNote, isLoading };
};
