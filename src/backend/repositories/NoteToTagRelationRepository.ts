import {
  PrismaClient,
  NoteToTagRelation as NoteToTagRelationModel,
} from "@prisma/client";
import { NoteToTagRelation } from "../models/NoteToTagRelation";

export class NoteToTagRelationRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async findUserByNoteId({
    userId,
    vocabularyNoteId,
  }: {
    userId: string;
    vocabularyNoteId: string;
  }): Promise<NoteToTagRelation[]> {
    return (
      await this.prismaClient.noteToTagRelation.findMany({
        where: { userId, vocabularyNoteId },
      })
    ).map(toNoteToTagRelation);
  }
  async upsertOne(tagRelation: NoteToTagRelation): Promise<NoteToTagRelation> {
    const tagModel = await this.prismaClient.noteToTagRelation.upsert({
      where: {
        id: tagRelation.id,
      },
      update: {
        ...toNoteToTagRelationModel(tagRelation),
      },
      create: {
        ...toNoteToTagRelationModel(tagRelation),
      },
    });

    return toNoteToTagRelation(tagModel);
  }

  async createMany(noteToTagRelations: NoteToTagRelation[]) {
    return await this.prismaClient.noteToTagRelation.createMany({
      data: noteToTagRelations.map(toNoteToTagRelationModel),
    });
  }
  async deleteMany({
    noteToTagRelationIds,
  }: {
    noteToTagRelationIds: string[];
  }) {
    await this.prismaClient.noteToTagRelation.deleteMany({
      where: {
        id: { in: noteToTagRelationIds },
      },
    });
  }
}

const toNoteToTagRelation = (
  tag: NoteToTagRelationModel
): NoteToTagRelation => {
  return new NoteToTagRelation(tag);
};

const toNoteToTagRelationModel = (
  tag: NoteToTagRelation
): NoteToTagRelationModel => {
  return {
    ...tag,
  };
};
