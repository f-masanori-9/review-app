import { zValidator } from "@hono/zod-validator";

import { z } from "zod";

import { VocabularyNoteRepository } from "@/backend/repositories/VocabularyNoteRepository";
import { prismaClient } from "@/server/prismaClient";
import { VocabularyNote } from "@/backend/models/VocabularyNote";

import { HTTPException } from "hono/http-exception";
import { createHandlers } from "../createHandlers";

const patchVocabularyNoteHandlerSchema = z.object({
  id: z.string().uuid(),
  frontContent: z.string(),
  backContent: z.string(),
});

const vocabularyNoteRepository = new VocabularyNoteRepository(prismaClient);

export const patchVocabularyNoteHandler = createHandlers(
  zValidator("json", patchVocabularyNoteHandlerSchema),
  async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");

    const vocabularyNote = await vocabularyNoteRepository.findById({
      id: body.id,
      userId: user.id,
    });

    // TODO: エラー時の処理をミドルウェアとして共通化
    if (!vocabularyNote) {
      throw new HTTPException(401, new Error("not fount vocabulary note"));
    }

    await vocabularyNoteRepository.update(
      new VocabularyNote({
        ...vocabularyNote,
        frontContent: body.frontContent,
        backContent: body.backContent,
      })
    );

    return c.json(vocabularyNote);
  }
);
