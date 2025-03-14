import { generateApiClient } from "@/libs/apiClient";
import useSWR, { mutate } from "swr";
import { EndPointType } from "../../../backend/src/presentator/routeTypes";
import { useCallback, useState } from "react";

const client = generateApiClient<EndPointType>();

export const swrKey = "vocabulary-notes";
export const useVocabularyNotes = () => {
  return useSWR(swrKey, async () => {
    const response = await client.api["vocabulary-notes"].$get();
    return response.json();
  });
};

export const mutateVocabularyNotes = () => mutate(swrKey);

export const useMutateVocabularyNotes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mutate = useCallback(async () => {
    try {
      setIsLoading(true);
      await mutateVocabularyNotes();
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { mutate, isLoading };
};
