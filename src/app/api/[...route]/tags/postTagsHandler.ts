import { prismaClient } from "@/server/prismaClient";
import { createHandlers } from "../createHandlers";
import { TagRepository } from "@/backend/repositories/TagRepositoty";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Tag } from "@/backend/models/Tag";

const tagRepository = new TagRepository(prismaClient);

const inputSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("createWithoutId"),
    tagName: z.string(),
  }),
  z.object({
    kind: z.literal("createWithId"),
    tagId: z.string(),
    tagName: z.string(),
  }),
]);

export const postTagsHandler = createHandlers(
  zValidator("json", inputSchema),
  async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");

    const vocabularyNote = await tagRepository.createOne(
      body.kind === "createWithId"
        ? Tag.createWithId({
            id: body.tagId,
            userId: user.id,
            name: body.tagName,
            order: 1, // TODO: orderの決定方法を考える
          })
        : Tag.createNew({
            userId: user.id,
            name: body.tagName,
            order: 1, // TODO: orderの決定方法を考える
          })
    );

    return c.json({ vocabularyNote });
  }
);
