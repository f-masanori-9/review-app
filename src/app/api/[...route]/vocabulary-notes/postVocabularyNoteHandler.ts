import { zValidator } from "@hono/zod-validator";

import { z } from "zod";

import { VocabularyNoteRepository } from "@/backend/repositories/VocabularyNoteRepository";
import { prismaClient } from "@/server/prismaClient";
import { VocabularyNote } from "@/backend/models/VocabularyNote";
import { createHandlers } from "../createHandlers";

const postVocabularyNoteHandlerSchema = z.object({
  id: z.string().uuid(),
  frontContent: z.string(),
  backContent: z.string(),
});

const vocabularyNoteRepository = new VocabularyNoteRepository(prismaClient);

export const postVocabularyNoteHandler = createHandlers(
  zValidator("json", postVocabularyNoteHandlerSchema),
  async (c) => {
    const user = c.get("user");

    const body = c.req.valid("json");
    const vocabularyNote = VocabularyNote.createNew({
      id: body.id,
      userId: user.id,
      frontContent: body.frontContent,
      backContent: body.backContent,
    });

    await vocabularyNoteRepository.create(vocabularyNote);

    return c.json({ vocabularyNote });
  }
);
