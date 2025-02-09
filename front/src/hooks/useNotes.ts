import { generateApiClient } from "@/libs/apiClient";
import useSWR, { mutate } from "swr";
import { EndPointType } from "../../../backend/src/presentator/routeTypes";

const client = generateApiClient<EndPointType>();

export const swrKey = "notes";
export const useNotes = () => {
  return useSWR(swrKey, async () => {
    const response = await client.api.notes.$get();
    return response.json();
  });
};

export const mutateNotes = () => mutate(swrKey);
