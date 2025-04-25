import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { useMutateTags } from "./useTags";

const internalApi = generateApiClient();

export const useCreateTag = () => {
  const { mutateTags } = useMutateTags();
  const createTag = useCallback(
    async ({ tagName }: { tagName: string }) => {
      await internalApi.api["tags"].$post({
        json: {
          kind: "createWithoutId",
          tagName,
        },
      });
      await mutateTags();
    },
    [mutateTags]
  );

  const createTagWithId = useCallback(
    async ({ tagName, tagId }: { tagName: string; tagId: string }) => {
      await internalApi.api["tags"].$post({
        json: {
          kind: "createWithId",
          tagName,
          tagId,
        },
      });
      await mutateTags();
    },
    [mutateTags]
  );

  return { createTag, createTagWithId };
};
