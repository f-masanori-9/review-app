import { prismaClient } from "@/server/prismaClient";
import { createHandlers } from "../createHandlers";
import { TagRepository } from "@/backend/repositories/TagRepositoty";

const tagRepository = new TagRepository(prismaClient);

export const getTagsHandler = createHandlers(async (c) => {
  const user = c.get("user");

  const tags = await tagRepository.findUserByUserId({
    userId: user.id,
  });

  return c.json({ tags });
});
