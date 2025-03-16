import { generateApiClient } from "@/libs/apiClient";
import useSWR, { mutate } from "swr";
import { useCallback } from "react";

const client = generateApiClient();

export const generateKey = (noteId: string) => ({
  noteId,
  name: "useNote",
});

export const useNote = (noteId: string) => {
  return useSWR(generateKey(noteId), async ({ noteId }) => {
    const response = await client.api.note[":noteId"].$get({
      param: { noteId },
    });

    return response.json();
  });
};

export const useMutateNote = () => {
  const mutateNote = useCallback(async (noteId: string) => {
    await mutate(generateKey(noteId));
  }, []);

  return { mutateNote };
};
