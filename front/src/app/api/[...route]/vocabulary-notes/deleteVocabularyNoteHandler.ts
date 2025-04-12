import { zValidator } from "@hono/zod-validator";

import { z } from "zod";

import { VocabularyNoteRepository } from "@/backend/repositories/VocabularyNoteRepository";
import { prismaClient } from "@/server/prismaClient";

import { createHandlers } from "../createHandlers";

const deleteVocabularyNoteHandlerSchema = z.object({
  id: z.string().uuid(),
});

const vocabularyNoteRepository = new VocabularyNoteRepository(prismaClient);

export const deleteVocabularyNoteHandler = createHandlers(
  zValidator("json", deleteVocabularyNoteHandlerSchema),
  async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");

    await vocabularyNoteRepository.delete({
      id: body.id,
      userId: user.id,
    });

    return c.json({ message: "ok" });
  }
);
