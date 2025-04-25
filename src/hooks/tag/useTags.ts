import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";

const client = generateApiClient();

export const generateSWRKey = () => {
  return {
    path: "useTags",
  } as const;
};

export const useTags = () => {
  return useSWR(generateSWRKey(), async () => {
    const response = await client.api["tags"].$get();
    const json = await response.json();
    return json.tags;
  });
};

export const useMutateTags = () => {
  const mutateTags = useCallback(async () => {
    await mutate(generateSWRKey());
  }, []);

  return { mutateTags };
};
