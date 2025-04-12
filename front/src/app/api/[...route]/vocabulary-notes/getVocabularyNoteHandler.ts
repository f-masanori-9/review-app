import { VocabularyNoteRepository } from "@/backend/repositories/VocabularyNoteRepository";
import { prismaClient } from "@/server/prismaClient";
import { createHandlers } from "../createHandlers";

const vocabularyNoteRepository = new VocabularyNoteRepository(prismaClient);

export const getVocabularyNoteHandler = createHandlers(async (c) => {
  const user = c.get("user");

  const vocabularyNotes = await vocabularyNoteRepository.findByUserId({
    userId: user.id,
  });

  return c.json({ vocabularyNotes });
});
