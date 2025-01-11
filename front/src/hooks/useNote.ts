import { generateApiClient } from "@/libs/apiClient";
import useSWR from "swr";
import { GetNoteRoute } from "../../../backend/src/presentator/routeTypes";

const client = generateApiClient<GetNoteRoute>();

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
