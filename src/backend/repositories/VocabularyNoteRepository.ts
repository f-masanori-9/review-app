import {
  PrismaClient,
  VocabularyNote as VocabularyNoteDAO,
} from "@prisma/client";
import { VocabularyNote } from "../models/VocabularyNote";
import { toVocabularyNoteReviewLog } from "./VocabularyNoteReviewLogRepository";

export class VocabularyNoteRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll() {
    return this.prismaClient.vocabularyNote.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async findById({ id, userId }: { id: string; userId: string }) {
    const result = await this.prismaClient.vocabularyNote.findUnique({
      where: { id, userId },
    });
    if (!result) {
      return null;
    }
    return toVocabularyNote(result);
  }

  async findByUserId({ userId }: { userId: string }) {
    const results = await this.prismaClient.vocabularyNote.findMany({
      where: { userId },
      include: { vocabularyNoteReviewLogs: true },
    });
    return results.map(({ vocabularyNoteReviewLogs, ...rest }) => {
      const vocabularyNote = toVocabularyNote(rest);
      const reviewLogs = vocabularyNoteReviewLogs.map(
        toVocabularyNoteReviewLog
      );
      return Object.assign(vocabularyNote, { reviewLogs });
    });
  }

  async create(vocabularyNote: VocabularyNote) {
    const result = await this.prismaClient.vocabularyNote.create({
      data: toVocabularyNoteDAO(vocabularyNote),
    });
    return toVocabularyNote(result);
  }

  async update(vocabularyNote: VocabularyNote) {
    const result = await this.prismaClient.vocabularyNote.update({
      where: { id: vocabularyNote.id },
      data: toVocabularyNoteDAO(vocabularyNote),
    });
    return toVocabularyNote(result);
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    await this.prismaClient.vocabularyNote.delete({
      where: { id, userId },
    });
  }
}

const toVocabularyNote = (data: VocabularyNoteDAO): VocabularyNote => {
  return new VocabularyNote({ ...data });
};

const toVocabularyNoteDAO = (data: VocabularyNote): VocabularyNoteDAO => {
  return {
    id: data.id,
    userId: data.userId,
    frontContent: data.frontContent,
    backContent: data.backContent,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
