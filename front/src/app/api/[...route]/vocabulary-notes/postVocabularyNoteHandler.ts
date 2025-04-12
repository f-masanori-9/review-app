import { zValidator } from "@hono/zod-validator";

import { z } from "zod";

import { createFactory } from "hono/factory";
import { VocabularyNoteRepository } from "@/backend/repositories/VocabularyNoteRepository";
import { prismaClient } from "@/server/prismaClient";
import { VocabularyNote } from "@/backend/models/VocabularyNote";
import { authConfig } from "@/auth";

const postVocabularyNoteHandlerSchema = z.object({
  id: z.string().uuid(),
  frontContent: z.string(),
  backContent: z.string(),
});

const vocabularyNoteRepository = new VocabularyNoteRepository(prismaClient);

export const postVocabularyNoteHandler = createFactory().createHandlers(
  zValidator("json", postVocabularyNoteHandlerSchema),
  async (c) => {
    // TODO: ミドルウェアとして共通化
    const session = await authConfig.auth();
    const userId = session?.user?.id;

    if (!userId) {
      return c.newResponse(JSON.stringify({ message: "Unauthorized" }), 401, {
        "Content-Type": "application/json",
      });
    }

    const body = c.req.valid("json");
    const vocabularyNote = VocabularyNote.createNew({
      id: body.id,
      userId,
      frontContent: body.frontContent,
      backContent: body.backContent,
    });

    await vocabularyNoteRepository.create(vocabularyNote);

    return c.json(vocabularyNote);
  }
);
