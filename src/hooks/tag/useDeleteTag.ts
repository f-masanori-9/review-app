import { generateApiClient } from "@/libs/apiClient";
import { useCallback } from "react";
import { useMutateTags } from "./useTags";

const internalApi = generateApiClient();

export const useDeleteTag = () => {
  const { mutateTags } = useMutateTags();
  const deleteTag = useCallback(
    async ({ tagId }: { tagId: string }) => {
      await internalApi.api["tags"].$delete({
        json: { tagId },
      });
      await mutateTags();
    },
    [mutateTags]
  );

  return { deleteTag };
};
