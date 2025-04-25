import { zValidator } from "@hono/zod-validator";

import { z } from "zod";

import { VocabularyNoteRepository } from "@/backend/repositories/VocabularyNoteRepository";
import { prismaClient } from "@/server/prismaClient";

import { HTTPException } from "hono/http-exception";
import { createHandlers } from "../createHandlers";

const patchVocabularyNoteHandlerSchema = z.discriminatedUnion("kind", [
  z.object({
    id: z.string().uuid(),
    kind: z.literal("frontContent"),
    frontContent: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    kind: z.literal("backContent"),
    backContent: z.string(),
  }),
]);

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

    switch (body.kind) {
      case "frontContent":
        vocabularyNote.update({ frontContent: body.frontContent });
        break;
      case "backContent":
        vocabularyNote.update({ backContent: body.backContent });
        break;
      default: {
        const _exhaustiveCheck: never = body;
      }
    }
    await vocabularyNoteRepository.update(vocabularyNote);

    return c.json(vocabularyNote);
  }
);
