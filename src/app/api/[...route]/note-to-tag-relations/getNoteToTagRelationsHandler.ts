import { prismaClient } from "@/server/prismaClient";
import { createHandlers } from "../createHandlers";
import { NoteToTagRelationRepository } from "@/backend/repositories/NoteToTagRelationRepository";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const noteToTagRelationRepository = new NoteToTagRelationRepository(
  prismaClient
);

const inputQuerySchema = z.object({
  noteId: z.string(),
});

export const getNoteToTagRelationsHandler = createHandlers(
  zValidator("query", inputQuerySchema),
  async (c) => {
    const user = c.get("user");
    const query = c.req.valid("query");
    const { noteId } = query;

    const tagRelations = await noteToTagRelationRepository.findUserByNoteId({
      userId: user.id,
      vocabularyNoteId: noteId,
    });

    return c.json({ tagRelations });
  }
);
