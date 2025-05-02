import { zValidator } from "@hono/zod-validator";

import { z } from "zod";

import { VocabularyNoteRepository } from "@/backend/repositories/VocabularyNoteRepository";
import { prismaClient } from "@/server/prismaClient";
import { VocabularyNote } from "@/backend/models/VocabularyNote";
import { createHandlers } from "../createHandlers";
import { NoteToTagRelationRepository } from "@/backend/repositories/NoteToTagRelationRepository";
import { NoteToTagRelation } from "@/backend/models/NoteToTagRelation";

const postVocabularyNoteHandlerSchema = z.object({
  id: z.string().uuid(),
  frontContent: z.string(),
  backContent: z.string(),
  tagIds: z.array(z.string()).optional(),
});

const vocabularyNoteRepository = new VocabularyNoteRepository(prismaClient);
const noteToTagRelationRepository = new NoteToTagRelationRepository(
  prismaClient
);

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
    const tagIds = body.tagIds || [];

    await vocabularyNoteRepository.create(vocabularyNote);
    if (tagIds.length > 0) {
      await noteToTagRelationRepository.createMany(
        tagIds.map((tagId) =>
          NoteToTagRelation.createNew({
            userId: user.id,
            tagId,
            vocabularyNoteId: vocabularyNote.id,
          })
        )
      );
    }

    return c.json({ vocabularyNote });
  }
);
