import { PrismaClient, Tag as TagModel } from "@prisma/client";
import { Tag } from "../models/Tag";

export class TagRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async findUserByUserId({ userId }: { userId: string }): Promise<Tag[]> {
    return (
      await this.prismaClient.tag.findMany({
        where: { userId },
      })
    ).map(toTag);
  }
  async createOne(tag: Tag) {
    await this.prismaClient.tag.create({
      data: toTagModel(tag),
    });
  }
  async deleteOne({ tagId, userId }: { tagId: string; userId: string }) {
    await this.prismaClient.tag.delete({
      where: { id: tagId, userId: userId },
    });
  }
}

const toTag = (tag: TagModel): Tag => {
  return new Tag(tag);
};

const toTagModel = (tag: Tag): TagModel => {
  return {
    ...tag,
  };
};
