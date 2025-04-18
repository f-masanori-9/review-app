import { VocabularyNoteRepository } from "@/backend/repositories/VocabularyNoteRepository";
import { prismaClient } from "@/server/prismaClient";
import { createHandlers } from "../createHandlers";

const vocabularyNoteRepository = new VocabularyNoteRepository(prismaClient);

export const getOneVocabularyNoteHandler = createHandlers(async (c) => {
  const user = c.get("user");
  const vocabularyNoteId = c.req.param("id");

  const vocabularyNote = await vocabularyNoteRepository.findById({
    userId: user.id,
    id: vocabularyNoteId,
  });

  return c.json({ vocabularyNote });
});
