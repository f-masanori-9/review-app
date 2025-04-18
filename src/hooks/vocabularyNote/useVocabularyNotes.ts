import { generateApiClient } from "@/libs/apiClient";
import useSWR, { mutate } from "swr";
import { useCallback, useState } from "react";

const client = generateApiClient();

export const generateSWRKey = () => {
  return {
    path: "vocabulary-notes",
  } as const;
};
export const fetcher = async ({ path }: { path: "vocabulary-notes" }) => {
  const response = await client.api[path].$get();
  const json = await response.json();
  return json.vocabularyNotes;
};
export const useVocabularyNotes = () => {
  return useSWR(generateSWRKey(), (key) => fetcher(key));
};

export const useMutateVocabularyNotes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mutate_ = useCallback(async () => {
    try {
      setIsLoading(true);
      await mutate(generateSWRKey());
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { mutate: mutate_, isLoading };
};
