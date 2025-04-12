import { zValidator } from "@hono/zod-validator";

import { z } from "zod";

import { prismaClient } from "@/server/prismaClient";
import { createHandlers } from "../../createHandlers";
import { VocabularyNoteReviewLogRepository } from "@/backend/repositories/VocabularyNoteReviewLogRepository";
import { VocabularyNoteReviewLog } from "@/backend/models/VocabularyNoteReviewLog";

const postVocabularyNoteReviewLogHandlerSchema = z.object({
  vocabularyNoteId: z.string().uuid(),
});

const vocabularyNoteReviewLogRepository = new VocabularyNoteReviewLogRepository(
  prismaClient
);

export const postVocabularyNoteReviewLogHandler = createHandlers(
  zValidator("json", postVocabularyNoteReviewLogHandlerSchema),
  async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");

    const vocabularyNoteReviewLog = VocabularyNoteReviewLog.createNew({
      userId: user.id,
      vocabularyNoteId: body.vocabularyNoteId,
    });

    await vocabularyNoteReviewLogRepository.create(vocabularyNoteReviewLog);

    return c.json(vocabularyNoteReviewLog);
  }
);
