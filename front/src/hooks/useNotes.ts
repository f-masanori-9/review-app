import { generateApiClient } from "@/libs/apiClient";
import useSWR, { mutate } from "swr";
import { GetNotesRoute } from "../../../backend/src/presentator";

const client = generateApiClient<GetNotesRoute>();

export const swrKey = "notes";
export const useNotes = () => {
  return useSWR(swrKey, async () => {
    const response = await client.api.notes.$get();
    return response.json();
  });
};

export const mutateNotes = () => mutate(swrKey);
