import { prismaClient } from "@/server/prismaClient";
import { createHandlers } from "../createHandlers";
import { TagRepository } from "@/backend/repositories/TagRepositoty";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const tagRepository = new TagRepository(prismaClient);

const inputSchema = z.object({
  tagId: z.string(),
});

export const deleteTagsHandler = createHandlers(
  zValidator("json", inputSchema),
  async (c) => {
    const user = c.get("user");
    const { tagId } = c.req.valid("json");

    await tagRepository.deleteOne({
      tagId: tagId,
      userId: user.id,
    });

    return c.json({ success: true });
  }
);
