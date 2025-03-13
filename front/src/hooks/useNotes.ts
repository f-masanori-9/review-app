import { generateApiClient } from "@/libs/apiClient";
import useSWR, { mutate } from "swr";
import { EndPointType } from "../../../backend/src/presentator/routeTypes";
import { useCallback, useState } from "react";

const client = generateApiClient<EndPointType>();

export const swrKey = "notes";
export const useNotes = () => {
  return useSWR(swrKey, async () => {
    const response = await client.api.notes.$get();
    const values = await response.json();
    return values;
  });
};

export const mutateNotes = () => mutate(swrKey);

export const useMutateNotes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mutate = useCallback(async () => {
    try {
      setIsLoading(true);
      await mutateNotes();
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { mutate, isLoading };
};
