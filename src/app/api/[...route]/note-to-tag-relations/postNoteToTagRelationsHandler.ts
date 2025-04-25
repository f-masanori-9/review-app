import { prismaClient } from "@/server/prismaClient";
import { createHandlers } from "../createHandlers";
import { NoteToTagRelationRepository } from "@/backend/repositories/NoteToTagRelationRepository";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { NoteToTagRelation } from "@/backend/models/NoteToTagRelation";

const noteToTagRelationRepository = new NoteToTagRelationRepository(
  prismaClient
);

const inputQuerySchema = z.object({
  noteId: z.string(),
  tagIds: z.array(z.string()),
});

export const postNoteToTagRelationsHandler = createHandlers(
  zValidator("json", inputQuerySchema),
  async (c) => {
    const user = c.get("user");
    const { noteId, tagIds } = c.req.valid("json");

    const currentTagRelations =
      await noteToTagRelationRepository.findUserByNoteId({
        userId: user.id,
        vocabularyNoteId: noteId,
      });
    const tagRelationsToDelete = currentTagRelations.filter(
      (relation) =>
        !tagIds.includes(relation.tagId) && relation.userId === user.id
    );
    const tagRelationsToCreate = tagIds.flatMap((tagId) => {
      const isExistingTagRelation = !!currentTagRelations.find(
        (relation) => relation.tagId === tagId && relation.userId === user.id
      );
      if (isExistingTagRelation) return [];
      return NoteToTagRelation.createNew({
        userId: user.id,
        vocabularyNoteId: noteId,
        tagId,
      });
    });
    await noteToTagRelationRepository.createMany(tagRelationsToCreate);
    await noteToTagRelationRepository.deleteMany({
      noteToTagRelationIds: tagRelationsToDelete.map((relation) => relation.id),
    });

    return c.json({});
  }
);
